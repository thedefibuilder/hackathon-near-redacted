// src/server/api/routers/strategy.ts

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { farmSchema, FarmCategories } from "@/lib/schemas/schema";
import { TRPCError } from "@trpc/server";

// Schema for investments in the database
const investmentSchema = z.object({
  chain: z.string(),
  protocol: z.string(),
  pool: z.string(),
  APR: z.string().optional(),
  amount: z.number(),
});

// Schema for the generate endpoint, matching the farm form
const generateStrategyInput = z.object({
  categories: z.array(z.nativeEnum(FarmCategories)),
  risk: z.number().min(0).max(100),
  neat: z.string(), // Amount in NEAR tokens
  time: z.date(),
  userId: z.string(),
});

// Schema for updating strategies
const updateStrategySchema = z.object({
  strategyId: z.string(),
  isFavorite: z.boolean().optional(),
  isActive: z.boolean().optional(),
  investments: z.array(investmentSchema).optional(),
});

export const strategyRouter = createTRPCRouter({
  // POST /generate - Generate new investment strategy
  generate: publicProcedure
    .input(generateStrategyInput)
    .mutation(async ({ ctx, input }) => {
      try {
        // Ensure user exists in database
        const user = await ctx.db.user.upsert({
          where: { id: input.userId },
          create: { id: input.userId },
          update: {},
        });

        // Convert NEAR amount to number
        const nearAmount = parseFloat(input.neat);
        if (isNaN(nearAmount)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid NEAR amount provided",
          });
        }

        // Generate investment strategy based on input parameters
        const generatedInvestments = await generateInvestmentStrategy({
          categories: input.categories,
          risk: input.risk,
          amount: nearAmount,
          time: input.time,
        });

        // Create strategy in database
        const strategy = await ctx.db.strategy.create({
          data: {
            userId: user.id,
            generationPrompt: `Generated strategy with risk level ${input.risk} for categories: ${input.categories.join(", ")}`,
            investments: {
              create: generatedInvestments,
            },
          },
          include: {
            investments: true,
          },
        });

        return {
          success: true,
          strategy,
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate strategy",
          cause: error,
        });
      }
    }),

  // POST /update-strategy - Update existing strategy
  updateStrategy: publicProcedure
    .input(updateStrategySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Verify strategy exists and get its current data
        const existingStrategy = await ctx.db.strategy.findUnique({
          where: { id: input.strategyId },
          include: { investments: true },
        });

        if (!existingStrategy) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Strategy not found",
          });
        }

        // Prepare update data
        const updateData: any = {};
        if (typeof input.isFavorite !== "undefined") {
          updateData.isFavorite = input.isFavorite;
        }
        if (typeof input.isActive !== "undefined") {
          updateData.isActive = input.isActive;
        }

        // Start a transaction to update strategy and investments
        const updatedStrategy = await ctx.db.$transaction(async (prisma) => {
          // Update strategy
          const strategy = await prisma.strategy.update({
            where: { id: input.strategyId },
            data: updateData,
          });

          // If new investments provided, replace existing ones
          if (input.investments) {
            // Delete existing investments
            await prisma.investment.deleteMany({
              where: { strategyId: input.strategyId },
            });

            // Create new investments
            await prisma.investment.createMany({
              data: input.investments.map((inv) => ({
                ...inv,
                strategyId: input.strategyId,
              })),
            });
          }

          // Return updated strategy with investments
          return prisma.strategy.findUnique({
            where: { id: input.strategyId },
            include: { investments: true },
          });
        });

        return updatedStrategy;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update strategy",
          cause: error,
        });
      }
    }),

  // GET /active-strategy - Get all active strategies for a user
  getActiveStrategies: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const strategies = await ctx.db.strategy.findMany({
          where: {
            userId: input.userId,
            isActive: true,
          },
          include: {
            investments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return strategies;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch active strategies",
          cause: error,
        });
      }
    }),

  // GET /saved-strategy - Get all saved (favorite) strategies for a user
  getSavedStrategies: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const strategies = await ctx.db.strategy.findMany({
          where: {
            userId: input.userId,
            isFavorite: true,
          },
          include: {
            investments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return strategies;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch saved strategies",
          cause: error,
        });
      }
    }),
});

// Helper function to generate investment strategy (placeholder for now)
async function generateInvestmentStrategy({
  categories,
  risk,
  amount,
  time,
}: {
  categories: FarmCategories[];
  risk: number;
  amount: number;
  time: Date;
}): Promise<
  Array<{
    chain: string;
    protocol: string;
    pool: string;
    APR: string;
    amount: number;
  }>
> {
  // TODO: Implement actual strategy generation logic
  // This is a placeholder that returns a sample investment distribution

  // Example risk-based allocation
  const investments = [];
  const totalAmount = amount;

  if (risk < 33) {
    // Low risk strategy
    investments.push({
      chain: "Multi-Chain",
      protocol: "Stable Protocol",
      pool: "USDC-USDT LP",
      APR: "5-8%",
      amount: totalAmount * 0.7,
    });
    investments.push({
      chain: "Ethereum",
      protocol: "Safe Yield",
      pool: "Stablecoin Vault",
      APR: "4-6%",
      amount: totalAmount * 0.3,
    });
  } else if (risk < 66) {
    // Medium risk strategy
    investments.push({
      chain: "Ethereum",
      protocol: "Balanced Yield",
      pool: "ETH-USDC LP",
      APR: "10-15%",
      amount: totalAmount * 0.5,
    });
    investments.push({
      chain: "Multi-Chain",
      protocol: "Yield Aggregator",
      pool: "Mixed Assets",
      APR: "8-12%",
      amount: totalAmount * 0.5,
    });
  } else {
    // High risk strategy
    investments.push({
      chain: "Multi-Chain",
      protocol: "Leverage Protocol",
      pool: "Leveraged Yield",
      APR: "20-30%",
      amount: totalAmount * 0.6,
    });
    investments.push({
      chain: "Ethereum",
      protocol: "High Yield Farm",
      pool: "Volatile Assets",
      APR: "15-25%",
      amount: totalAmount * 0.4,
    });
  }

  return investments;
}
