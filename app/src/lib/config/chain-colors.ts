// src/lib/config/chain-colors.ts

export const chainColors = {
  // Layer 1 Networks
  ethereum: "#627EEA",
  bsc: "#F3BA2F", // Binance Smart Chain
  solana: "#14F195",
  cardano: "#0033AD",
  polkadot: "#E6007A",
  near: "#6ce89e",
  avalanche: "#E84142",
  cosmos: "#2E3148",
  multiversx: "#00d3ba", // Former Elrond
  tron: "#FF0013",
  hedera: "#00D4A0",
  algorand: "#000000",
  internet_computer: "#4B32C3",
  flow: "#00EF8B",

  // Layer 2 & Scaling Solutions
  polygon: "#8247E5",
  arbitrum: "#2D374B",
  optimism: "#FF0420",
  base: "#0052FF",
  fantom: "#1969FF",
  zkSync: "#1E69FF",
  immutablex: "#00BFFF",
  ronin: "#40B58A",
  mantle: "#141414",
  linea: "#121212",
  zksync_era: "#8C8DFC",

  // Specialized Networks
  cronos: "#002D74",
  harmony: "#00AEE9",
  moonbeam: "#53CBC9",
  celo: "#35D07F",
  gnosis: "#3E6957",
  starknet: "#1E9B8C",
  klaytn: "#FF1F54",
  aurora: "#6ce89e",
  metis: "#00DACC",

  // DeFi Focused
  kava: "#FF564F",
  oasis: "#0092F6",
  thorchain: "#33FF99",
  osmosis: "#750CCB",
  injective: "#36D5B5",

  // Enterprise & Private Networks
  quorum: "#1348E4",
  hyperledger: "#2F3134",
  stellar: "#000000",
  ripple: "#23292F",

  // Fallback color for unknown chains
  fallback: "#0096FF",
} as const;

// Helper function
export const getChainColor = (chain: string): string => {
  const normalizedChain = chain.toLowerCase().trim();
  return normalizedChain in chainColors
    ? chainColors[normalizedChain as keyof typeof chainColors]
    : chainColors.fallback;
};
