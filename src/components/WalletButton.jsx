import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useCustomWallet } from '../hooks/useWallet';
import { Button, CircularProgress } from '@mui/material';

const WalletButton = () => {
    const { isLoading, error, isReady } = useCustomWallet();

    if (isLoading) {
        return (
            <Button disabled variant="contained">
                <CircularProgress size={20} />
            </Button>
        );
    }

    if (error) {
        return (
            <Button
                color="error"
                variant="contained"
                onClick={() => window.location.reload()}
            >
                Wallet Error - Click to Retry
            </Button>
        );
    }

    return <WalletMultiButton />;
};

export default WalletButton; 