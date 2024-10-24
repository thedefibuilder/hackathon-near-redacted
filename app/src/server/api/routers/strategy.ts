import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { FarmCategories } from "@/lib/schemas/schema";
import { TRPCError } from "@trpc/server";
import { generateInvestmentAdvice } from "@/lib/openai";
import { PriceService } from "@/lib/services/price-service";
import { InvestmentRiskLevel } from "@/lib/schemas/investment-types";

const investmentSchema = z.object({
  chain: z.string(),
  protocol: z.string(),
  pool: z.string(),
  APR: z.number().optional(),
  amount: z.number().nonnegative(), 
});

const generateStrategyInput = z.object({
  categories: z.array(z.nativeEnum(FarmCategories)),
  risk: z.nativeEnum(InvestmentRiskLevel),
  near: z.string().refine(val => !isNaN(parseFloat(val)), {
    message: "NEAR amount must be a valid number",
  }),
  time: z.string(),
  userId: z.string(),
});

const updateStrategySchema = z.object({
  strategyId: z.string(),
  isFavorite: z.boolean().optional(),
  isActive: z.boolean().optional(),
  investments: z.array(investmentSchema).optional(),
});

export const strategyRouter = createTRPCRouter({

  generate: publicProcedure
    .input(generateStrategyInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.upsert({
          where: { id: input.userId },
          create: { id: input.userId },
          update: {},
        });
        const nearAmount = parseFloat(input.near);
        const usdAmount = await PriceService.convertNearToUSD(nearAmount);
        const generatedInvestments = await generateInvestmentAdvice({
          categories: input.categories,
          risk:input.risk,
          amount: usdAmount,
          time: input.time,
        });

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

  updateStrategy: publicProcedure
    .input(updateStrategySchema)
    .mutation(async ({ ctx, input }) => {
      try {
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
        const updateData: { isFavorite?: boolean; isActive?: boolean } = {};
        if (input.isFavorite !== undefined) {
          updateData.isFavorite = input.isFavorite;
        }
        if (input.isActive !== undefined) {
          updateData.isActive = input.isActive;
        }
        const updatedStrategy = await ctx.db.$transaction(async (prisma) => {
          await prisma.strategy.update({
            where: { id: input.strategyId },
            data: updateData,
          });
          if (input.investments) {
            await prisma.investment.deleteMany({
              where: { strategyId: input.strategyId },
            });
            await prisma.investment.createMany({
              data: input.investments.map((inv) => ({
                ...inv,
                strategyId: input.strategyId,
              })),
            });
          }
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
