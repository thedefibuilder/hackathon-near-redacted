import { z } from "zod";

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
    ])
  ),
  risk: z.number() 
    .min(0, { message: "Risk must be at least 0" }) 
    .max(100, { message: "Risk must be at most 100" }), 
  neat: z.string()
    .refine(value => !isNaN(Number(value)) && Number(value) >= 0, {
      message: "Amount must be a positive number"
    }), 
  time: z.date() 
});
