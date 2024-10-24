import { z } from "zod";
import { InvestmentRiskLevel } from "./investment-types";

export enum FarmCategories {
  ARTIFICIAL_INTELLIGENCE = "Artificial Intelligence",
  R_W_A = "R.W.A",
  DE_PIN = "DePin",
  BORROWING_LENDING = "Borrowing/Lending",
  STABLE_COINS = "Stable Coins",
  MEME_FINANCE = "Meme Finance",
  RESTAKING_PROTOCOLS = "Restaking Protocols",
}

export const farmSchema = z.object({
  categories: z.array(
    z.enum([
      FarmCategories.ARTIFICIAL_INTELLIGENCE,
      FarmCategories.R_W_A,
      FarmCategories.DE_PIN,
      FarmCategories.BORROWING_LENDING,
      FarmCategories.STABLE_COINS,
      FarmCategories.RESTAKING_PROTOCOLS,
      FarmCategories.MEME_FINANCE,
    ]),
  ),
  risk: z.nativeEnum(InvestmentRiskLevel),

  near: z.string()
    .refine(value => !isNaN(Number(value)) && Number(value) >= 0, {
      message: "Amount must be a positive number"
    }),
  time: z.enum([
    'Less than 6 months',
    '6 - 12 months',
    '12 - 24 months',
    'More than 24 months',
  ]),
});

export const modalFormSchema = z.object({
  near: z.string()
    .refine(value => !isNaN(Number(value)) && Number(value) >= 0, {
      message: "Amount must be a positive number"
    }),
  time: z.enum([
    'Less than 6 months',
    '6 - 12 months',
    '12 - 24 months',
    'More than 24 months',
  ]),
  investment: z.array(z.object({
    img: z.string().url(),
    currency: z.string(),
    usdValue: z.number()
      .refine(value => value >= 0, {
        message: "USD Value must be a non-negative number"
      }),
      risk: z.nativeEnum(InvestmentRiskLevel),
    protocol: z.string(),
    chain: z.string(),
    pool: z.string(),
    apr: z.number().nullable(),
  })),
});

