import { IconTriangleFilled } from "@tabler/icons-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";
import { Button } from "../ui/button";
import { investmentPlan } from "../investments-plan/investments-plan";
import InvestmentPlanMainCard from "../investments-plan/investment-plan-main-card";

type TPortofolioTableItem = {
  title: string;
  balance: string;
  lastHours: string;
  pnl: string;
  protocols: {
    img: string;
  }[];
  chains: {
    img: string;
  }[];
};

// Example array of portfolio items
const portofolioTableItems: TPortofolioTableItem[] = [
  {
    title: "AI Strategy",
    balance: "12,000",
    lastHours: "24",
    pnl: "1250",
    protocols: [
      { img: "/akash.png" },
      { img: "/comp.png" },
      { img: "/cream.png" },
      { img: "/sushi-swap.png" },
    ],
    chains: [
      { img: "/arbitrum-one.png" },
      { img: "/cosmos.png" },
      { img: "/base.png" },
      { img: "/binance-smart-chain.png" },
    ],
  },
  {
    title: "AI Strategy",
    balance: "12,000",
    lastHours: "24",
    pnl: "1250",
    protocols: [
      { img: "/akash.png" },
      { img: "/comp.png" },
      { img: "/cream.png" },
      { img: "/sushi-swap.png" },
    ],
    chains: [
      { img: "/arbitrum-one.png" },
      { img: "/cosmos.png" },
      { img: "/base.png" },
      { img: "/binance-smart-chain.png" },
    ],
  },
  {
    title: "AI Strategy",
    balance: "12,000",
    lastHours: "24",
    pnl: "1250",
    protocols: [
      { img: "/akash.png" },
      { img: "/comp.png" },
      { img: "/cream.png" },
      { img: "/sushi-swap.png" },
    ],
    chains: [
      { img: "/arbitrum-one.png" },
      { img: "/cosmos.png" },
      { img: "/base.png" },
      { img: "/binance-smart-chain.png" },
    ],
  },
];

export default function PortofolioTableItem() {
  return (
    <Accordion type="single" collapsible>
      {portofolioTableItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            <div className="h-4" />
            <div className="flex items-center justify-between pl-4 pr-12">
              <h1>{item.title}</h1>
              <p>${item.balance}</p>
              <div className="flex items-center gap-2 text-primary">
                <IconTriangleFilled />
                <p>{item.lastHours}%</p>
              </div>
              <p className="text-white">${item.pnl}</p>
              <div className="flex items-center gap-3">
                {item.protocols.map((protocol, i) => (
                  <Image
                    key={i}
                    src={protocol.img}
                    alt={`protocol-${i}`}
                    width={24}
                    height={24}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                {item.chains.map((chain, i) => (
                  <Image
                    key={i}
                    src={chain.img}
                    alt={`chain-${i}`}
                    width={24}
                    height={24}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Button className="hove:bg-primary rounded-full bg-primary px-4 py-2 text-black">
                  Add Funds
                </Button>
                <Button className="rounded-full bg-muted-foreground px-4 py-2 text-white hover:bg-muted-foreground">
                  Claim
                </Button>
              </div>
            </div>
          </AccordionTrigger>

          <div className="h-4" />

          <AccordionContent>
            {investmentPlan.map((plan, index) => {
              return (
                <InvestmentPlanMainCard
                  investment={plan.investment}
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
