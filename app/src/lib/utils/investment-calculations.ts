import { type APIInvestment } from "@/lib/schemas/investment-types";

// Calculate average APR from investments
export const calculateAverageAPR = (investments: APIInvestment[]): number => {
  const validAPRs = investments
    .filter((inv) => inv.APR != null) // This checks for both null and undefined
    .map((inv) => inv.APR!); // Use non-null assertion to indicate that APR is definitely a number here

  if (validAPRs.length === 0) return 0;

  const sum = validAPRs.reduce((acc, apr) => acc + apr, 0);
  return sum / validAPRs.length;
};

// Calculate estimated profit and loss (PnL)
export const calculateEstimatedPnL = (investments: APIInvestment[]): number => {
  const averageAPR = calculateAverageAPR(investments);
  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);

  // Calculate annual PnL
  const annualPnL = (totalInvestment * averageAPR) / 100;

  return annualPnL;
};

// Format a value as a percentage
export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

// Format a value as currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
