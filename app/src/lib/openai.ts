// src/lib/openai.ts

import OpenAI from "openai"; // Use import type for types
import type { FarmCategories } from "./schemas/schema";
import { InvestmentRiskLevel } from "./schemas/investment-types"; // Ensure this enum is correctly defined

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
  risk: InvestmentRiskLevel; // Use the enum directly
  amount: number;
  time: string;
}) {
  try {
    // Create a thread
    const thread = await openai.beta.threads.create();

    // Generate the prompt based on input parameters
    const prompt = generatePrompt({ categories, risk, amount, time });
    console.log("Generated prompt:", prompt);

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

    // Check if the content is of type that has text
    const responseText =
      lastMessage?.content?.[0]?.type === "text"
        ? lastMessage.content[0].text?.value
        : null;

    if (!responseText) {
      throw new Error("Invalid response format from assistant");
    }

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
  risk: InvestmentRiskLevel; 
  amount: number;
  time: string;
}): string {

  const riskLevel = 
  risk === InvestmentRiskLevel.LOW
    ? "low"
    : risk === InvestmentRiskLevel.MEDIUM
    ? "medium"
    : risk === InvestmentRiskLevel.HIGH
    ? "high"
    : "degen"; 

  const timeFrame = time.toString().split("T")[0];

  return `Generate an investment strategy with the following parameters:
- Investment Categories: ${categories.join(", ")}
- Risk Level: ${riskLevel}
- Investment Amount: ${amount} USD
- Time Frame: Starting from ${timeFrame}


Consider the following:
1. Spread the investment across different protocols based on the risk level
2. Ensure the total allocated amount matches the input amount
3. Focus on projects of the specified categories
4. Provide at least 2 different investments for diversification`;
}

function extractInvestments(response: string): Array<{
  chain: string;
  protocol: string;
  pool: string;
  APR: number;
  amount: number;
}> {
  try {
    // Find all JSON objects in the response using a safer approach
    const jsonRegex = /{[^{}]*}/g;
    const matches = response.match(jsonRegex);

    if (!matches) {
      throw new Error("No valid JSON found in response");
    }

    // Safely parse each JSON object and ensure proper type checking
    return matches.map((match) => {
      const parsed = JSON.parse(match) as {
        chain?: string;
        protocol?: string;
        pool?: string;
        APR?: number;
        amount?: number;
      };

      // Ensure that all properties are present and valid
      if (
        typeof parsed.chain === "string" &&
        typeof parsed.protocol === "string" &&
        typeof parsed.pool === "string" &&
        typeof parsed.APR === "number" &&
        typeof parsed.amount === "number"
      ) {
        return {
          chain: parsed.chain,
          protocol: parsed.protocol,
          pool: parsed.pool,
          APR: parsed.APR,
          amount: parsed.amount,
        };
      } else {
        // If any field is missing or invalid, throw an error
        throw new Error("Invalid data structure in response");
      }
    });
  } catch (error) {
    console.error("Error parsing assistant response:", error);
    throw new Error("Failed to parse investment recommendations");
  }
}
