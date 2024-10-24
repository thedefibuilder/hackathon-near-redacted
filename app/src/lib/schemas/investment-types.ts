import { type TablerIcon } from "@tabler/icons-react";
import { z } from "zod";

export enum InvestmentRiskLevel {
  LOW = "Low Risk",
  MEDIUM = "Medium Risk",
  HIGH = "Hight Risk",
  Degen = "Degen Risk",
}

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
  img?:string;
};


export type InvestmentPlanHeaderCardProps = {
  aiRisk: number;
  generatedDate: string;
  title: string;
  estimatedPnL: number;
  averageAPR: number; 
  investmentInfo: InvestmentInfo[];
};

export type InvestmentPlanCardProps = {
  investment: Investment[];
};

export type InvestmentPlanMainCardProps = InvestmentPlanCardProps & {
  onRemove?: (index: number) => void;
  isEditing?: boolean;
  investment: Investment[];

};


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

export const investmentInfoSchema = z.object({
  icon: z.any(),
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
  estimatedPnL: z.number(),
  averageAPR: z.number(),
  investmentInfo: z.array(investmentInfoSchema),
});

export const investmentPlanSchema = z.object({
  investment: z.array(investmentSchema),
});
