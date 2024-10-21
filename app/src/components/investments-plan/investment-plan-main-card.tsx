import Image from "next/image";

import { cn } from "@/lib/utils";
import { IconMinus } from "@tabler/icons-react";
import { TInvestmentPlanCard } from "./investments-plan";

interface InvestmentPlanMainCardProps extends TInvestmentPlanCard {
  onRemove?: (index: number) => void;
  isEditing?: boolean;
}

export default function InvestmentPlanMainCard({
  investment,
  isEditing,
  onRemove,
}: InvestmentPlanMainCardProps) {
  const totalValue = investment.reduce((sum, item) => sum + item.usdValue, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

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
                  alt="img"
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
                      "bg-red-300 text-red-600": item.risk === "Height Risk",
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
              {isEditing && onRemove ? (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700 rounded-full border border-red-500 h-6 w-6 flex items-center absolute top-4 right-4"
                >
                  <IconMinus stroke={2} />
                </button>
              ) : null}
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
    </>
  );
}
