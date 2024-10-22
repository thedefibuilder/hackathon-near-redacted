// Existing imports
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IconMinus } from "@tabler/icons-react";
import { TInvestmentPlanCard } from "./investments-plan";
import { Progress } from "../ui/progress";

interface InvestmentPlanMainCardProps extends TInvestmentPlanCard {
  onRemove?: (index: number) => void;
  isEditing?: boolean;
  haveStrategyPrompt?: boolean;
}

export default function InvestmentPlanMainCard({
  investment,
  isEditing,
  onRemove,
  haveStrategyPrompt,
}: InvestmentPlanMainCardProps) {
  const totalValue = investment.reduce((sum, item) => sum + item.usdValue, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const uniqueCategories = Array.from(
    new Set(investment.flatMap(item => item.categories?.map(category => category.trim())))
  );
  const riskValues: Record<string, number> = {
    "Low Risk": 25,
    "Medium Risk": 50,
    "High Risk": 75,
  };

  const averageRisk = investment.reduce((sum, item) => {
    return sum + (riskValues[item.risk] ?? 0);
  }, 0) / investment.length;
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {investment.map((item, index) => (
          <div key={index} className="w-[calc(50%-0.5rem)]">
            <div className="relative flex items-center justify-between rounded-lg bg-[#0F0F0F] p-4">
              <div
                className={cn([
                  "absolute bottom-0 left-0 h-2 w-full rounded-b-lg",
                  {
                    "bg-investYellow": index === 0,
                    "bg-investBlue": index === 1,
                    "bg-investOrange": index === 2,
                    "bg-investPurpel": index === 3,
                  },
                ])}
              />

              <div className="flex w-4/12 justify-center">
                <Image
                  src={item.img}
                  alt="Investment image"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
              </div>

              <div className="w-3/5 pb-3">
                <div
                  className={cn([
                    "w-3/5 rounded px-2 py-1 text-center",
                    {
                      "bg-green-300 text-green-600": item.risk === "Low Risk",
                      "bg-yellow-300 text-yellow-600":
                        item.risk === "Medium Risk",
                      "bg-red-300 text-red-600": item.risk === "High Risk",
                    },
                  ])}
                >
                  <p>{item.risk}</p>
                </div>
                <div className="h-4" />
                <p className="text-[12px] text-white">{item.currency}</p>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-bold">
                    {formatCurrency(item.usdValue)}
                  </p>
                  <p className="text-[12px] text-muted">5.3% APR</p>
                </div>
              </div>

              {isEditing && onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="absolute right-4 top-4 flex h-6 w-6 items-center rounded-full border border-red-500 text-red-500 hover:text-red-700"
                >
                  <IconMinus stroke={2} />
                </button>
              )}
            </div>
            <div className="h-4" />
          </div>
        ))}
      </div>

      <div className="h-4" />
      <p className="text-xl">Funds distribution</p>
      <div className="h-4" />
      <div className="flex h-2 w-full overflow-hidden rounded-lg bg-gray-300">
        {investment.map((item, index) => {
          const percentage = (item.usdValue / totalValue) * 100;
          return (
            <div
              key={index}
              style={{ width: `${percentage}%` }}
              className={cn([
                "h-full",
                {
                  "bg-investYellow": index === 0,
                  "bg-investBlue": index === 1,
                  "bg-investOrange": index === 2,
                  "bg-investPurpel": index === 3,
                },
              ])}
            />
          );
        })}
      </div>
      {haveStrategyPrompt && (
        <>
          <div className="h-6" />
          <div className="p-3 rounded-lg border border-[#A4A2A2] bg-[#0F0F0F]">
            <h2 className="text-2xl text-white">Strategy Prompt</h2>
            <div className="h-4" />
            <p className="text-[16px]">Categories</p>
            <div className="h-2" />
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.map((category, index) => (
                <p key={index} className="text-white bg-[#202020] p-2">
                  {category}
                </p>
              ))}
            </div>
            <div className="h-4" />
            <p className="text-[16px]">Risk Tolerance</p>
            <div className="h-2" />
            <Progress value={averageRisk} />
            <div className="h-2" />
            <div className="flex justify-between w-full">
              <p>Very Low</p>
              <p>Very High</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
