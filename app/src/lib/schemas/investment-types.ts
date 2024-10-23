import { type TablerIcon } from "@tabler/icons-react";
import { z } from "zod";

// Enums
export enum InvestmentRiskLevel {
  LOW = "Low Risk",
  MEDIUM = "Medium Risk",
  HIGH = "High Risk", // Fixed typo
}

// API Types (matching backend)
export interface APIInvestment {
  id: string;
  strategyId: string;
  chain: string;
  protocol: string;
  pool: string;
  APR: number | null;
  amount: number;
}

export interface APIStrategy {
  id: string;
  userId: string;
  createdAt: string;
  isFavorite: boolean;
  isActive: boolean;
  generationPrompt: string;
  investments: APIInvestment[];
}

// UI Types
export type InvestmentInfo = {
  icon: TablerIcon;
  name?: string;
  value: number | string | Date | undefined;
};

export type Investment = {
  protocol: string;
  chain: string;
  pool: string;
  usdValue: number;
  apr: number | null;
  risk: InvestmentRiskLevel;
};

// Component Types
export type InvestmentPlanHeaderCardProps = {
  aiRisk: number;
  generatedDate: string;
  title: string;
  estimatePnl: number;
  investmentInfo: InvestmentInfo[];
};

export type InvestmentPlanCardProps = {
  investment: Investment[];
};

export type InvestmentPlanMainCardProps = InvestmentPlanCardProps & {
  onRemove?: (index: number) => void;
  isEditing?: boolean;
};

// Zod Schemas
export const investmentInfoSchema = z.object({
  icon: z.any(), // TablerIcon type
  name: z.string().optional(),
  value: z.union([z.number(), z.string(), z.date(), z.undefined()]),
});

export const investmentSchema = z.object({
  protocol: z.string(),
  chain: z.string(),
  pool: z.string(),
  usdValue: z.number().positive(),
  apr: z.number().nullable(),
  risk: z.nativeEnum(InvestmentRiskLevel),
});

export const investmentPlanHeaderSchema = z.object({
  aiRisk: z.number().min(0).max(100),
  generatedDate: z.string(),
  title: z.string(),
  estimatePnl: z.number(),
  investmentInfo: z.array(investmentInfoSchema),
});

export const investmentPlanSchema = z.object({
  investment: z.array(investmentSchema),
});
