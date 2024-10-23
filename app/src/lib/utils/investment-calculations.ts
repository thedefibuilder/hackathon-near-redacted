import { type APIInvestment } from "@/lib/schemas/investment-types";

export const calculateAverageAPR = (investments: APIInvestment[]): number => {
  const validAPRs = investments
    .filter((inv) => inv.APR !== null)
    .map((inv) => inv.APR as number);
  if (validAPRs.length === 0) return 0;

  const sum = validAPRs.reduce((acc, apr) => acc + apr, 0);
  return sum / validAPRs.length;
};

export const calculateEstimatedPnL = (investments: APIInvestment[]): number => {
  const averageAPR = calculateAverageAPR(investments);
  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);

  // Calculate annual PnL
  const annualPnL = (totalInvestment * averageAPR) / 100;

  return annualPnL;
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
