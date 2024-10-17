import { connect, keyStores, WalletConnection } from "near-api-js";

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

  console.log("Wallet initialized:", wallet); // Log wallet for debugging

  return { near: nearConnection, wallet };
};

// Explicitly define the type of wallet parameter
export const login = async (wallet: WalletConnection) => {
  console.log("Requesting sign-in...");
  await wallet.requestSignIn({
    keyType: "ed25519",
  });
  console.log("Sign-in request sent.");
};

export const logout = async (wallet: WalletConnection) => {
  wallet.signOut();
  window.location.reload(); // Reload the page after logout to clear the app state
};
