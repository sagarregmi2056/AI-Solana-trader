import React, { useState, useEffect } from 'react';
import {
    Paper, Grid, TextField, Switch, FormControlLabel, Button,
    Typography, Alert, Snackbar, Box, Chip, Divider
} from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';
import { AccountBalanceWallet, Warning } from '@mui/icons-material';

function Settings() {
    const { publicKey, connected, wallet } = useWallet();
    const [balance, setBalance] = useState(0);
    const [settings, setSettings] = useState({
        maxInvestmentPerTrade: 1,
        takeProfitPercentage: 50,
        stopLossPercentage: 20,
        enableAITrading: true,
        minimumLiquidity: 10,
        skipSuspiciousTokens: true,
        onlyVerifiedDEX: true
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        loadSettings();
        if (connected && publicKey) {
            fetchWalletBalance();
            // Fetch balance every 30 seconds
            const interval = setInterval(fetchWalletBalance, 30000);
            return () => clearInterval(interval);
        }
    }, [connected, publicKey]);

    const fetchWalletBalance = async () => {
        try {
            // Use devnet for testing or get a proper RPC endpoint for mainnet
            const connection = new Connection(
                // For testing use devnet:
                clusterApiUrl('devnet'),

                // For mainnet, use your RPC endpoint:
                // 'https://your-rpc-endpoint.com'
                'confirmed'
            );

            if (!publicKey) {
                console.log('No public key available');
                return;
            }

            console.log('Fetching balance for wallet:', publicKey.toString());
            const balance = await connection.getBalance(publicKey);
            console.log('Raw balance:', balance);

            const solBalance = balance / LAMPORTS_PER_SOL;
            console.log('SOL balance:', solBalance);

            setBalance(parseFloat(solBalance.toFixed(5)));
        } catch (error) {
            console.error('Failed to fetch wallet balance:', error);
            setSnackbar({
                open: true,
                message: 'Failed to fetch wallet balance. Please check your network connection.',
                severity: 'error'
            });
        }
    };

    const loadSettings = async () => {
        try {
            const response = await fetch('http://147.182.229.96:3000/api/settings', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Loaded settings:', data);
            setSettings(data);
        } catch (error) {
            console.error('Failed to load settings:', error);
            setSnackbar({
                open: true,
                message: 'Failed to load settings: ' + error.message,
                severity: 'error'
            });
        }
    };

    const handleChange = (field) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked :
            event.target.type === 'number' ? parseFloat(event.target.value) :
                event.target.value;

        // Validate maxInvestmentPerTrade against wallet balance
        if (field === 'maxInvestmentPerTrade' && value > balance) {
            setSnackbar({
                open: true,
                message: 'Investment amount cannot exceed wallet balance',
                severity: 'warning'
            });
            return;
        }

        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://147.182.229.96:3000/api/settings', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...settings,
                    walletAddress: publicKey?.toString()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Settings saved:', result);

            setSnackbar({
                open: true,
                message: 'Settings saved successfully',
                severity: 'success'
            });

        } catch (error) {
            console.error('Failed to save settings:', error);
            setSnackbar({
                open: true,
                message: 'Failed to save settings: ' + error.message,
                severity: 'error'
            });
        }
    };

    return (
        <Grid container spacing={3}>
            {/* Wallet Information */}
            <Grid item xs={12}>
                <Paper sx={{ p: 3, mb: 2 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <AccountBalanceWallet color="primary" />
                        <Typography variant="h6">
                            Wallet Status
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography variant="body1">
                                {connected ? (
                                    <>
                                        Connected: {publicKey?.toString().slice(0, 4)}...
                                        {publicKey?.toString().slice(-4)}
                                    </>
                                ) : (
                                    'Wallet not connected'
                                )}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Chip
                                label={`Balance: ${balance.toFixed(5)} SOL`}
                                color="primary"
                                variant="outlined"
                            />
                        </Grid>
                        {!connected && (
                            <Grid item xs={12}>
                                <Alert severity="warning">
                                    Please connect your wallet to enable trading
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            </Grid>

            {/* Trading Parameters */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Trading Parameters
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Maximum Investment per Trade (SOL)"
                                type="number"
                                value={settings.maxInvestmentPerTrade}
                                onChange={handleChange('maxInvestmentPerTrade')}
                                inputProps={{
                                    min: 0.1,
                                    step: 0.1,
                                    max: balance
                                }}
                                helperText={`Maximum available: ${balance.toFixed(5)} SOL`}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Take Profit (%)"
                                type="number"
                                value={settings.takeProfitPercentage}
                                onChange={handleChange('takeProfitPercentage')}
                                inputProps={{ min: 1, step: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Stop Loss (%)"
                                type="number"
                                value={settings.stopLossPercentage}
                                onChange={handleChange('stopLossPercentage')}
                                inputProps={{ min: 1, step: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.enableAITrading}
                                        onChange={handleChange('enableAITrading')}
                                    />
                                }
                                label="Enable AI Trading Assistant"
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Token Filters
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Minimum Liquidity (SOL)"
                                type="number"
                                value={settings.minimumLiquidity}
                                onChange={handleChange('minimumLiquidity')}
                                inputProps={{ min: 1, step: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.skipSuspiciousTokens}
                                        onChange={handleChange('skipSuspiciousTokens')}
                                    />
                                }
                                label="Skip Tokens with Suspicious Features"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.onlyVerifiedDEX}
                                        onChange={handleChange('onlyVerifiedDEX')}
                                    />
                                }
                                label="Only Trade on Verified DEXs"
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSave}
                    disabled={!connected}
                >
                    Save Settings
                </Button>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            >
                <Alert
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default Settings;
