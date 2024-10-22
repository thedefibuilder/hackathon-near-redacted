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
import { cn } from "@/lib/utils";

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
    categories?:string[]
  }[]
};
export type TInvestmentPlanProps = {
  isGrid?: boolean;
  haveStrategyPrompt?:boolean
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
    investment: [
      {
        img: "/sushi-swap.png",
        currency: "TAO/USDT",
        usdValue: "4,000",
        risk: "Low Risk",
      },
      {
        img: "/akash.png",
        currency: "TAO/USDT",
        usdValue: "5,000",
        risk: "Medium Risk",
      },
      {
        img: "/cream.png",
        currency: "USDT",
        usdValue: "2,000",
        risk: "Medium Risk",
      },
      {
        img: "/quorum.png",
        currency: "USDC",
        usdValue: "1,000",
        risk: "Height Risk",
      },
    ],
  },
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
    investment: [
      {
        img: "/sushi-swap.png",
        currency: "TAO/USDT",
        usdValue: "4,000",
        risk: "Low Risk",
      },
      {
        img: "/akash.png",
        currency: "TAO/USDT",
        usdValue: "5,000",
        risk: "Medium Risk",
      },
      {
        img: "/cream.png",
        currency: "USDT",
        usdValue: "2,000",
        risk: "Medium Risk",
      },
      {
        img: "/quorum.png",
        currency: "USDC",
        usdValue: "1,000",
        risk: "Height Risk",
      },
    ],
  }
];

export const investmentPlan = [
  {
    investment: [
      {
        img: "/sushi-swap.png",
        currency: "TAO/USDT",
        usdValue: 4000,
        risk: "Low Risk",
        categories: [
         ' Artificial Intelligence',
         'Meme Finance'
        ]
      },
      {
        img: "/akash.png",
        currency: "TAO/USDT",
        usdValue: 5000,
        risk: "Medium Risk",
        categories: [
          ' Artificial Intelligence',
          'Meme Finance'
         ]
      },
      {
        img: "/cream.png",
        currency: "USDT",
        usdValue: 2000,
        risk: "Medium Risk",
        categories: [
          ' Artificial Intelligence',
          'Meme Finance'
         ]
      },
      {
        img: "/quorum.png",
        currency: "USDC",
        usdValue: 1000,
        risk: "Height Risk",
        categories: [
          ' Artificial Intelligence',
          'Meme Finance'
         ]
      },
    ]
  }
];

export default function InvestmentPlan({ isGrid, haveStrategyPrompt }: TInvestmentPlanProps) {
  return (
    <Accordion type="single" collapsible className={cn(isGrid ? "flex flex-wrap gap-4 items-start" : "")}>
      <div className={cn(isGrid ? "w-full flex flex-wrap gap-4 items-start" : "")}>
        {investmentPlanHeader.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="mb-4 rounded-[34px] border-none bg-foreground p-4 text-white flex-1 min-w-[calc(50%-16px)]"
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
            <div className="h-4" />
            <AccordionContent className="border-t-2">
              <div className="pt-4">
                {investmentPlan.map((plan, index) => {
                  return (
                    <InvestmentPlanMainCard investment={plan.investment} key={index} haveStrategyPrompt={haveStrategyPrompt}/>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </div>
    </Accordion>
  );
}
