import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';

export const useCustomWallet = () => {
    const wallet = useWallet();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkWallet = async () => {
            try {
                setIsLoading(true);
                if (!wallet.connected && wallet.connecting) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Wallet connection error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        checkWallet();
    }, [wallet.connected, wallet.connecting]);

    return {
        ...wallet,
        isLoading,
        error,
        isReady: !isLoading && !error && wallet.connected
    };
}; 