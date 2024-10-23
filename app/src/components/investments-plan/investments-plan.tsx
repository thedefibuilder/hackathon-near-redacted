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
import {
  type InvestmentPlanHeaderCardProps,
  type InvestmentPlanCardProps,
  InvestmentRiskLevel,
} from "@/lib/schemas/investment-types";

const investmentPlanHeader: InvestmentPlanHeaderCardProps[] = [
  {
    aiRisk: 3,
    generatedDate: "2024-10-20",
    title: "My Investment Plan 1",
    estimatePnl: 15000,
    investmentInfo: [
      { icon: IconBox, name: "Chains", value: 4 },
      { icon: IconPig, name: "Protocols", value: 3 },
      { icon: IconWallet, name: "$", value: 12000 },
      { icon: IconCalendarTime, value: "6 months" },
    ],
  },
];

export const investmentPlan: InvestmentPlanCardProps[] = [
  {
    investment: [
      {
        img: "/sushi-swap.png",
        currency: "TAO/USDT",
        usdValue: 4000,
        risk: InvestmentRiskLevel.LOW,
      },
      {
        img: "/akash.png",
        currency: "TAO/USDT",
        usdValue: 5000,
        risk: InvestmentRiskLevel.MEDIUM,
      },
      {
        img: "/cream.png",
        currency: "USDT",
        usdValue: 2000,
        risk: InvestmentRiskLevel.MEDIUM,
      },
      {
        img: "/quorum.png",
        currency: "USDC",
        usdValue: 1000,
        risk: InvestmentRiskLevel.HIGH,
      },
    ],
  },
];

export default function InvestmentPlan() {
  return (
    <Accordion type="single" collapsible>
      {investmentPlanHeader.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="mb-4 rounded-[34px] border-none bg-foreground p-4 text-white"
        >
          <AccordionTrigger className="flex flex-col items-start hover:no-underline">
            <InvestmentPlanHeaderCard {...item} />
          </AccordionTrigger>
          <div className="h-8" />
          <AccordionContent className="border-t-2">
            <div className="h-8" />
            {investmentPlan.map((item, index) => (
              <InvestmentPlanMainCard key={index} {...item} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
