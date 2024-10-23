import { connect, keyStores, WalletConnection } from "near-api-js";

export const CHAIN_SIGNATURE_CONTRACT = "v1.signer-prod.testnet";

const getNearConfig = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://testnet.mynearwallet.com/",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://testnet.nearblocks.io",
  };
};

export const initNear = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  const nearConfig = getNearConfig();
  if (!nearConfig) {
    throw new Error("Failed to load NEAR configuration.");
  }

  const nearConnection = await connect(nearConfig);
  const wallet = new WalletConnection(nearConnection, "my-app");
  return { near: nearConnection, wallet };
};

export const login = async (wallet: WalletConnection) => {
  await wallet.requestSignIn({
    keyType: "ed25519",
  });
};

export const logout = async (wallet: WalletConnection) => {
  wallet.signOut();
  window.location.reload();
};

export const chainsConfig = {
  ethereum: {
    providerUrl:
      "https://sepolia.infura.io/v3/6df51ccaa17f4e078325b5050da5a2dd",
    scanUrl: "https://etherscan.io",
    name: "ETH",
  },
  bsc: {
    providerUrl: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
    scanUrl: "https://testnet.bscscan.com",
    name: "BNB",
  },
};
