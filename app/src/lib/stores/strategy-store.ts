import { create } from "zustand";
import { type Strategy, type Investment } from "@prisma/client";

interface StrategyWithInvestments extends Strategy {
  investments: Investment[];
}

interface StrategyState {
  strategies: StrategyWithInvestments[];
  isLoading: boolean;
  currentStrategy: StrategyWithInvestments | null;
  setStrategies: (strategies: StrategyWithInvestments[]) => void;
  addStrategy: (strategy: StrategyWithInvestments) => void;
  setCurrentStrategy: (strategy: StrategyWithInvestments | null) => void;
  setLoading: (loading: boolean) => void;
  updateStrategy: (
    id: string,
    updates: Partial<StrategyWithInvestments>,
  ) => void;
}

export const useStrategyStore = create<StrategyState>()((set) => ({
  strategies: [],
  isLoading: false,
  currentStrategy: null,
  setStrategies: (strategies) => set({ strategies }),
  addStrategy: (strategy) =>
    set((state) => ({
      strategies: [...state.strategies, strategy],
      currentStrategy: strategy,
    })),
  setCurrentStrategy: (strategy) => set({ currentStrategy: strategy }),
  setLoading: (loading) => set({ isLoading: loading }),
  updateStrategy: (id, updates) =>
    set((state) => ({
      strategies: state.strategies.map((strategy) =>
        strategy.id === id ? { ...strategy, ...updates } : strategy,
      ),
      currentStrategy:
        state.currentStrategy?.id === id
          ? { ...state.currentStrategy, ...updates }
          : state.currentStrategy,
    })),
}));
