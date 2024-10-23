"use client";

import {
  IconBox,
  IconCalendarTime,
  IconPig,
  IconWallet,
} from "@tabler/icons-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import InvestmentPlanHeaderCard from "./invetsments-plan-header-card";
import InvestmentPlanMainCard from "./investment-plan-main-card";
import { useStrategyStore } from "@/lib/stores/strategy-store";
import {
  InvestmentRiskLevel,
  type Investment,
} from "@/lib/schemas/investment-types";
import InvestmentSkeleton from "./investment-skeleton";
import {
  calculateAverageAPR,
  calculateEstimatedPnL,
  formatCurrency,
} from "@/lib/utils/investment-calculations";

export default function InvestmentsPlan() {
  const { currentStrategy, isLoading } = useStrategyStore();

  if (isLoading) {
    return <InvestmentSkeleton />;
  }


  if (!currentStrategy) {
    return (
      <div className="flex h-[400px] items-center justify-center text-muted">
        <p>Generate a strategy to see investment recommendations</p>
      </div>
    );
  }

  const getRiskLevel = (apr: number | null): InvestmentRiskLevel => {
    if (!apr || apr < 50) return InvestmentRiskLevel.LOW;
    if (apr < 100) return InvestmentRiskLevel.MEDIUM;
    return InvestmentRiskLevel.HIGH;
  };

  // Calculate metrics
  const averageAPR = calculateAverageAPR(currentStrategy.investments);
  const estimatedPnL = calculateEstimatedPnL(currentStrategy.investments);
  const totalInvestment = currentStrategy.investments.reduce(
    (sum, inv) => sum + inv.amount,
    0,
  );

  // Transform API investments to UI format
  const transformedInvestments: Investment[] = currentStrategy.investments.map(
    (inv) => ({
      protocol: inv.protocol,
      chain: inv.chain,
      pool: inv.pool,
      usdValue: inv.amount,
      apr: inv.APR,
      risk: getRiskLevel(inv.APR),
    }),
  );

  // Extract categories from generation prompt
  const categories = currentStrategy.generationPrompt
    ? (() => {
        const parts = currentStrategy.generationPrompt.split("categories: ");
        return parts[1]
          ? parts[1].split(", ").join(" & ")
          : "No categories available";
      })()
    : "No categories available";

  const strategyData = {
    aiRisk: Math.floor(averageAPR), // Using average APR as AI risk indicator
    generatedDate: new Date(currentStrategy.createdAt).toLocaleDateString(),
    title: `${categories} Strategy`,
    estimatedPnL: estimatedPnL,
    estimatePnl: estimatedPnL,
    averageAPR: averageAPR,
    investmentInfo: [
      {
        icon: IconBox,
        name: "Chains",
        value: new Set(currentStrategy.investments.map((inv) => inv.chain))
          .size,
      },
      {
        icon: IconPig,
        name: "Protocols",
        value: currentStrategy.investments.length,
      },
      {
        icon: IconWallet,
        name: "Total Investment",
        value: formatCurrency(totalInvestment),
      },
      {
        icon: IconCalendarTime,
        value: "Annual Projection",
      },
    ],
  };

  return (
    <Accordion type="single" collapsible defaultValue="strategy">
      <AccordionItem
        value="strategy"
        className="mb-4 rounded-[34px] border-none bg-foreground p-4 text-white"
      >
        <AccordionTrigger className="flex flex-col items-start hover:no-underline">
          <InvestmentPlanHeaderCard {...strategyData} />
        </AccordionTrigger>
        <div className="h-8" />
        <AccordionContent className="border-t border-opacity-10">
          <div className="h-8" />
          <InvestmentPlanMainCard investment={transformedInvestments} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
