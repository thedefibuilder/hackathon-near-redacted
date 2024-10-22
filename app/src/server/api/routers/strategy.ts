// src/server/api/routers/strategy.ts

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { farmSchema, FarmCategories } from "@/lib/schemas/schema";
import { TRPCError } from "@trpc/server";
import { generateInvestmentAdvice } from "@/lib/openai";

// Schema for investments in the database
const investmentSchema = z.object({
  chain: z.string(),
  protocol: z.string(),
  pool: z.string(),
  APR: z.string().optional(),
  amount: z.number(),
});

// Schema for generating new strategies
const generateStrategyInput = z.object({
  categories: z.array(z.nativeEnum(FarmCategories)),
  risk: z.number().min(0).max(100),
  neat: z.string(),
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

        // Generate investment strategy using OpenAI
        const generatedInvestments = await generateInvestmentAdvice({
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

        if (!updatedStrategy) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update strategy",
          });
        }

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
