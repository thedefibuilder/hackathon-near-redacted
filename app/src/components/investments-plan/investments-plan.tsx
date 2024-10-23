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
    if (!apr || apr < 1) return InvestmentRiskLevel.LOW;
    if (apr < 2) return InvestmentRiskLevel.MEDIUM;
    return InvestmentRiskLevel.HIGH;
  };

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

  const strategyData = {
    aiRisk: 3, // This could come from the AI model
    generatedDate: new Date(currentStrategy.createdAt).toLocaleDateString(),
    title: "Investment Strategy",
    estimatePnl: currentStrategy.investments.reduce(
      (sum, inv) => sum + inv.amount,
      0,
    ),
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
        name: "$",
        value: currentStrategy.investments.reduce(
          (sum, inv) => sum + inv.amount,
          0,
        ),
      },
      { icon: IconCalendarTime, value: "6 months" }, // This could be configurable
    ],
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="strategy"
        className="mb-4 rounded-[34px] border-none bg-foreground p-4 text-white"
      >
        <AccordionTrigger className="flex flex-col items-start hover:no-underline">
          <InvestmentPlanHeaderCard {...strategyData} />
        </AccordionTrigger>
        <div className="h-8" />
        <AccordionContent className="border-t-2">
          <div className="h-8" />
          <InvestmentPlanMainCard investment={transformedInvestments} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
