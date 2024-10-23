import { chainsConfig, initNear } from "../nearConfig";
import { Account, WalletConnection } from "near-api-js";
import { useState, useEffect } from "react";
import {
  signAndSendEVMTransaction,
  fetchDerivedEVMAddress,
} from "multichain-tools";

export default function useNearTransaction() {
  const [wallet, setWallet] = useState<WalletConnection>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [result, setResult] = useState<any>();

  useEffect(() => {
    async function init() {
      const near = await initNear();

      if (near) {
        setWallet(near.wallet);
      }
    }

    init();
  }, []);

  const submit = async () => {
    setIsLoading(true);
    if (!wallet) return;

    const derivedPath = "ethereum-1";

    try {
      const accountId = wallet.getAccountId();
      const address = await fetchDerivedEVMAddress({
        signerId: accountId,
        path: {
          chain: 60,
          domain: "",
          meta: {
            path: derivedPath,
          },
        },
        nearNetworkId: "testnet",
        multichainContractId: process.env.NEXT_PUBLIC_CHAIN_SIGNATURE_CONTRACT!,
      });

      console.log("ADDRESS", address);
      const nearAuthentication = {
        networkId: "testnet" as const,
        keypair: await wallet._keyStore.getKey("testnet", accountId),
        accountId: accountId,
      };

      const result = await signAndSendEVMTransaction({
        transaction: {
          to: "0x9586238f3145784d7d9F4dFE1b996BA1D930c4e1",
          value: "1",
        },
        chainConfig: {
          providerUrl: chainsConfig.ethereum.providerUrl,
          contract: process.env.NEXT_PUBLIC_CHAIN_SIGNATURE_CONTRACT!,
        },
        nearAuthentication,
        derivationPath: {
          chain: 60,
          domain: "",
          meta: {
            path: derivedPath,
          },
        },
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading };
}
