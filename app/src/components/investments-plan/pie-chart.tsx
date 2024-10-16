"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
  { chain: "Ethereum", visitors: 22.5, fill: "hsl(258, 86%, 34%)" },
  { chain: "Arbitrum One", visitors: 10.2, fill: "hsl(181, 100%, 39%)" },
  { chain: "Binance Chain", visitors: 15.8, fill: "hsl(50, 100%, 50%)" },
  { chain: "Polkadot", visitors: 14.9, fill: "hsl(333, 93%, 56%)" },
];

const chartConfig = {
  ethereum: {
    label: "Ethereum",
    color: "hsl(258, 86%, 34%)",
  },
  arbitrumOne: {
    label: "Arbitrum One",
    color: "hsl(181, 100%, 39%)",
  },
  binanceChain: {
    label: "Binance Chain",
    color: "hsl(50, 100%, 50%)",
  },
  polkadot: {
    label: "Polkadot",
    color: "hsl(333, 93%, 56%)",
  },
} satisfies ChartConfig;

export function PieChartCustom() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="chain"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                        <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) + 24}
                      className="fill-white text-2xl font-bold"
                    >
                      16.5%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-muted "
                    >
                      APR
                    </tspan>  
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
