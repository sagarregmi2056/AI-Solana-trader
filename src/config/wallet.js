import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

export const network = WalletAdapterNetwork.Devnet; // or Mainnet
export const endpoint = clusterApiUrl(network);

export const wallets = [
    new PhantomWalletAdapter(),
];

// Add fallback handling
export const walletConfig = {
    wallets: wallets,
    autoConnect: true,
    onError: (error) => {
        console.error('Wallet error:', error);
    },
}; 