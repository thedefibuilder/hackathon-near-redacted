// src/lib/services/price-service.ts

import NodeCache from "node-cache";
import { z } from "zod";

// Cache configuration (12 hours = 43200 seconds)
const cache = new NodeCache({ stdTTL: 43200 });

const CACHE_KEY = "near_price_usd";
const COINGECKO_API = "https://api.coingecko.com/api/v3";

// Response schema for type safety
const priceResponseSchema = z.object({
  near: z.object({
    usd: z.number(),
  }),
});

export class PriceService {
  private static async fetchNearPrice(): Promise<number> {
    try {
      const response = await fetch(
        `${COINGECKO_API}/simple/price?ids=near&vs_currencies=usd`,
      );

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.statusText}`);
      }

      const data = await response.json();
      const validated = priceResponseSchema.parse(data);
      return validated.near.usd;
    } catch (error) {
      console.error("Error fetching NEAR price:", error);
      throw new Error("Failed to fetch NEAR price");
    }
  }

  static async getNearPriceUSD(): Promise<number> {
    // Try to get price from cache first
    const cachedPrice = cache.get<number>(CACHE_KEY);
    if (cachedPrice !== undefined) {
      return cachedPrice;
    }

    // If not in cache, fetch new price
    const price = await this.fetchNearPrice();

    // Store in cache
    cache.set(CACHE_KEY, price);

    return price;
  }

  static async convertNearToUSD(nearAmount: number): Promise<number> {
    const price = await this.getNearPriceUSD();
    return nearAmount * price;
  }
}

// Error handling types
export class PriceConversionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PriceConversionError";
  }
}
