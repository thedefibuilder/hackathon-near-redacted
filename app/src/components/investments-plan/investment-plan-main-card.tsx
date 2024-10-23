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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getChainColor } from "@/lib/config/chain-colors";


export default function InvestmentPlanMainCard({
  investment,
  isEditing,
  onRemove,
}: InvestmentPlanMainCardProps) {
  const totalValue = investment.reduce((sum, item) => sum + item.usdValue, 0);

  // Group investments by chain and calculate total percentages
  const chainDistributions = investment.reduce(
    (acc, item) => {
      const chain = item.chain;
      const percentage = (item.usdValue / totalValue) * 100;

      if (!acc[chain]) {
        acc[chain] = {
          percentage: 0,
          color: getChainColor(chain),
        };
      }
      acc[chain].percentage += percentage;
      return acc;
    },
    {} as Record<string, { percentage: number; color: string }>,
  );

  // Convert to array and sort by percentage for consistent rendering
  const sortedChainDistributions = Object.entries(chainDistributions).sort(
    (a, b) => b[1].percentage - a[1].percentage,
  );

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
    <TooltipProvider>
      <div className="flex flex-wrap gap-4">
        {investment.map((item, index) => (
          <div key={index} className="w-[calc(50%-0.5rem)]">
            <div className="relative flex items-center justify-between rounded-lg bg-[#0F0F0F] p-4">
              <div
                className={cn([
                  "absolute bottom-0 left-0 h-2 w-full rounded-b-lg",
                ])}
                style={{ backgroundColor: getChainColor(item.chain) }}
              />

              <div className="relative w-4/12 max-w-[80px]">
                <Tooltip>
                  <TooltipTrigger asChild>
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
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white">
                    <p>{item.protocol}</p>
                  </TooltipContent>
                </Tooltip>

                <div className="absolute -bottom-0 -right-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Image
                          src={getChainIcon(item.chain)}
                          alt={`${item.chain} icon`}
                          width={24}
                          height={24}
                          className="rounded-full ring-2 ring-background"
                          onError={handleImageError}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white">
                      <p>{item.chain}</p>
                    </TooltipContent>
                  </Tooltip>
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
        {sortedChainDistributions.map(([chain, { percentage, color }]) => (
          <Tooltip key={chain}>
            <TooltipTrigger asChild>
              <div
                style={{
                  width: `${percentage}%`,
                  backgroundColor: color,
                }}
                className={cn(["h-full cursor-default"])}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white">
              <p>
                {chain}: {percentage.toFixed(1)}%
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
