// src/lib/openai.ts

import OpenAI from "openai";
import { FarmCategories } from "./schemas/schema";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = "asst_n9iruqzngfHDbUiidWLDVphx";

export async function generateInvestmentAdvice({
  categories,
  risk,
  amount,
  time,
}: {
  categories: FarmCategories[];
  risk: number;
  amount: number;
  time: Date;
}) {
  try {
    // Create a thread
    const thread = await openai.beta.threads.create();

    // Generate the prompt based on input parameters
    const prompt = generatePrompt({ categories, risk, amount, time });

    // Add the message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: prompt,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    });

    // Poll for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    while (runStatus.status !== "completed") {
      if (runStatus.status === "failed") {
        throw new Error("Assistant run failed");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    // Get the messages
    const messages = await openai.beta.threads.messages.list(thread.id);

    // Get the last assistant message
    const lastMessage = messages.data
      .filter((msg) => msg.role === "assistant")
      .pop();

    if (
      !lastMessage ||
      !lastMessage.content[0] ||
      !("text" in lastMessage.content[0])
    ) {
      throw new Error("Invalid response format from assistant");
    }

    const responseText = lastMessage.content[0].text.value;

    const investments = extractInvestments(responseText);

    return investments;
  } catch (error) {
    console.error("Error generating investment advice:", error);
    throw error;
  }
}

function generatePrompt({
  categories,
  risk,
  amount,
  time,
}: {
  categories: FarmCategories[];
  risk: number;
  amount: number;
  time: Date;
}): string {
  const riskLevel = risk <= 33 ? "low" : risk <= 66 ? "medium" : "high";
  const timeFrame = time.toISOString().split("T")[0];

  return `Generate an investment strategy with the following parameters:
- Investment Categories: ${categories.join(", ")}
- Risk Level: ${riskLevel} (${risk}%)
- Investment Amount: ${amount} USD
- Time Frame: Starting from ${timeFrame}



Consider the following:
1. Split the investment across different protocols based on the risk level
2. Ensure the total allocated amount matches the input amount
3. Focus on projects of the specified categories
4. Provide at least 2 different investments for diversification`;
}

function extractInvestments(response: string): Array<{
  chain: string;
  protocol: string;
  pool: string;
  APR: string;
  amount: number;
}> {
  try {
    // Find all JSON objects in the response
    const jsonRegex = /{[^{}]*}/g;
    const matches = response.match(jsonRegex);

    if (!matches) {
      throw new Error("No valid JSON found in response");
    }

    // Parse each JSON object
    return matches.map((match) => JSON.parse(match));
  } catch (error) {
    console.error("Error parsing assistant response:", error);
    throw new Error("Failed to parse investment recommendations");
  }
}
