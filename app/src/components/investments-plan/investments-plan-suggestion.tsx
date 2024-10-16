import {
  IconExclamationCircle,
  IconSparkles,
  IconWallet,
} from "@tabler/icons-react";
import Image from "next/image";

type TInvestmentSuggestion = {
  protocol: {
    name: string;
    img: string;
  };
  investPercent: string;
  chain: string;
  currency: string;
  usdValue: string;
  risk: string;
};

const investmentSuggestions: TInvestmentSuggestion[] = [
  {
    protocol: {
      name: "SushiSwap",
      img: "/sushi-swap.png",
    },
    investPercent: "22.5",
    chain: "Ethereum",
    currency: "TAO - USDT",
    usdValue: "4000",
    risk: "Low Risk",
  },
  {
    protocol: {
      name: "Akash",
      img: "/akash.png",
    },
    investPercent: "10.2",
    chain: "Arbitrum One",
    currency: "AKA - USDT",
    usdValue: "5000",
    risk: "Medium Risk",
  },
  {
    protocol: {
      name: "Quorum",
      img: "/quorum.png",
    },
    investPercent: "15.8",
    chain: "Binance Chain",
    currency: "QUO - USDC",
    usdValue: "2000",
    risk: "Medium Risk",
  },
  {
    protocol: {
      name: "Cream",
      img: "/cream.png",
    },
    investPercent: "14.9",
    chain: "Polkadot",
    currency: "FIA - CRE",
    usdValue: "1000",
    risk: "High Risk",
  },
];

export default function InvestmentsPlanSuggestion() {
  return (
    <>
      {investmentSuggestions.map((suggestion, index) => (
        <div className="flex justify-between" key={index}>
          <div className="flex gap-3 mb-4 w-9/12">
            <Image
              src={suggestion.protocol.img}
              width={40}
              height={40}
              alt={suggestion.protocol.name}
            />
            <div>
              <h3 className="text-xl font-medium text-white">
                {suggestion.protocol.name}
                <span className="text-[12px] text-[#2DC24E]">
                  {" "}
                  {suggestion.investPercent} APR
                </span>
              </h3>
              <div className="flex items-center gap-3 text-muted">
                <div className="flex items-center gap-1">
                  <IconSparkles stroke={2} />
                  <p>{suggestion.currency}</p>
                </div>
                <div className="flex items-center gap-1">
                  <IconWallet stroke={2} />
                  <p>{suggestion.usdValue}$</p>
                </div>
                <div className="flex items-center gap-1">
                  <IconExclamationCircle stroke={2} />
                  <p>{suggestion.risk} Risk</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="rounded-full bg-chart-ethereum px-4 py-2 font-medium text-white">
              {suggestion.chain}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
