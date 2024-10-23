import { type TablerIcon } from "@tabler/icons-react";
import { z } from "zod";

// Enums
export enum InvestmentRiskLevel {
  LOW = "Low Risk",
  MEDIUM = "Medium Risk",
  HIGH = "Height Risk", // Note: You might want to fix the typo from "Height" to "High"
}

// Base Types
export type InvestmentInfo = {
  icon: TablerIcon;
  name?: string;
  value: number | string | Date | undefined;
};

export type Investment = {
  img: string;
  currency: string;
  usdValue: number;
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
  img: z.string().url(),
  currency: z.string(),
  usdValue: z.number().positive(),
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
