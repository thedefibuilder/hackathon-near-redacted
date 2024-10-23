import Image from "next/image";
import { cn } from "@/lib/utils";
import { IconMinus } from "@tabler/icons-react";
import {
  type InvestmentPlanMainCardProps,
  InvestmentRiskLevel,
} from "@/lib/schemas/investment-types";
import {
  getProtocolIcon,
  getChainIcon,
  handleImageError,
} from "@/lib/utils/protocol-utils";

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

  const getRiskColorClasses = (risk: InvestmentRiskLevel) => {
    switch (risk) {
      case InvestmentRiskLevel.LOW:
        return "bg-green-300 text-green-600";
      case InvestmentRiskLevel.MEDIUM:
        return "bg-yellow-300 text-yellow-600";
      case InvestmentRiskLevel.HIGH:
        return "bg-red-300 text-red-600";
      default:
        return "";
    }
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

              <div className="relative w-4/12 max-w-[80px]">
                {/* Protocol Icon - Larger and in the background */}
                <div className="flex h-20 w-20 items-center justify-center">
                  <Image
                    src={getProtocolIcon(item.protocol)}
                    alt={`${item.protocol} icon`}
                    width={80}
                    height={80}
                    className="rounded-full bg-white/10 p-1"
                    onError={handleImageError}
                  />
                </div>

                {/* Chain Icon - Smaller and overlaid in the bottom right */}
                <div className="absolute -bottom-0 -right-0">
                  <Image
                    src={getChainIcon(item.chain)}
                    alt={`${item.chain} icon`}
                    width={24}
                    height={24}
                    className="rounded-full ring-2 ring-background"
                    onError={handleImageError}
                  />
                </div>
              </div>

              <div className="w-3/5 pb-3">
                <div
                  className={cn([
                    "w-3/5 rounded px-2 py-1 text-center",
                    getRiskColorClasses(item.risk),
                  ])}
                >
                  <p>{item.risk}</p>
                </div>
                <div className="h-4" />
                <p className="text-[12px] text-white">{item.pool}</p>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-bold">
                    {formatCurrency(item.usdValue)}
                  </p>
                  {item.apr && (
                    <p className="text-[12px] text-muted">
                      {item.apr.toFixed(2)}% APR
                    </p>
                  )}
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
    </>
  );
}
