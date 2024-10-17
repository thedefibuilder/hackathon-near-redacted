/* eslint-disable  @typescript-eslint/no-floating-promises */

'use client'
import { useEffect, useState } from 'react';
import { WalletConnection } from 'near-api-js'; 
import { initNear, login, logout } from '@/lib/nearConfig';
import { Button } from '../ui/button';

export default function WalletButton () {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const checkWalletConnection = async () => {
      const accountData = await initNear();
      if (accountData) {
        const { wallet } = accountData;

        setWallet(wallet); 
        if (wallet.isSignedIn()) {
          setAccountId(wallet.getAccountId());
        } 
      } 
      setLoading(false); 
    };
    checkWalletConnection(); 
  }, []);

  const handleLogin = async () => {
    if (wallet) {
      await login(wallet); 
    } 
  };

  const handleLogout = async () => {
    if (wallet) {
      await logout(wallet);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      {accountId ? (
        <div>
          <Button onClick={handleLogout} className="text-black hover:bg-red-600 bg-red-500 hover:text-black">Disconnect</Button>
        </div>
      ) : (
        <Button onClick={handleLogin} className="text-black hover:bg-primary hover:text-black">
          Connect to NEAR Wallet
        </Button>
      )}
    </div>
  );
};


