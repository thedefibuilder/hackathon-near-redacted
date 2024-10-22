import {
  IconBox,
  IconCalendarTime,
  IconPig,
  IconWallet,
  TablerIcon,
} from "@tabler/icons-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import InvestmentPlanHeaderCard from "./invetsments-plan-header-card";
import InvestmentPlanMainCard from "./investment-plan-main-card";

export type TInvestmentPlanHeaderCard = {
  aiRisk: number;
  generatedDate: string;
  title: string;
  estimatePnl: number;
  investmentInfo: {
    icon: TablerIcon;
    name?: string;
    value: number | string | Date | undefined;
  }[];
};

export type TInvestmentPlanCard = {
  investment: {
    img: string;
    currency: string;
    usdValue: number;
    risk: string;
  }[];
};

const investmentPlanHeader = [
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

export const investmentPlan = [
  {
    investment: [
      {
        img: "/sushi-swap.png",
        currency: "TAO/USDT",
        usdValue: 4000,
        risk: "Low Risk",
      },
      {
        img: "/akash.png",
        currency: "TAO/USDT",
        usdValue: 5000,
        risk: "Medium Risk",
      },
      {
        img: "/cream.png",
        currency: "USDT",
        usdValue: 2000,
        risk: "Medium Risk",
      },
      {
        img: "/quorum.png",
        currency: "USDC",
        usdValue: 1000,
        risk: "Height Risk",
      },
    ],
  },
];

export default function InvestmentPlan() {
  return (
    <Accordion type="single" collapsible className="">
      {investmentPlanHeader.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="mb-4 rounded-[34px] border-none bg-foreground p-4 text-white"
        >
          <AccordionTrigger className="flex flex-col items-start hover:no-underline">
            <InvestmentPlanHeaderCard
              aiRisk={item.aiRisk}
              generatedDate={item.generatedDate}
              title={item.title}
              estimatePnl={item.estimatePnl}
              investmentInfo={item.investmentInfo}
            />
          </AccordionTrigger>
          <div className="h-8" />
          <AccordionContent className="border-t-2">
            <div className="h-8" />
            {investmentPlan.map((item, index) => {
              return (
                <InvestmentPlanMainCard
                  investment={item.investment}
                  key={index}
                />
              );
            })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
