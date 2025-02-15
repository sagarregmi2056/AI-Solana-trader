import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Import styles directly
import '@solana/wallet-adapter-react-ui/styles.css';

function WalletButton() {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = clusterApiUrl(network);
    const wallets = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
    ];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletMultiButton />
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default WalletButton; 