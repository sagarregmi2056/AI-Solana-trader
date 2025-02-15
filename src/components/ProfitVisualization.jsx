import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { alpha, useTheme } from '@mui/material/styles';

const ProfitVisualization = () => {
    const theme = useTheme();
    const [balance, setBalance] = useState(100);
    const [profits, setProfits] = useState([]);
    const [totalProfit, setTotalProfit] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const profit = Math.random() * 2 + 0.5; // Random profit between 0.5 and 2.5 SOL
            setBalance(prev => prev + profit);
            setTotalProfit(prev => prev + profit);
            setProfits(prev => [...prev, profit].slice(-5)); // Keep last 5 profits
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ py: 8 }}>
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 400,
                    mx: 'auto',
                    p: 3,
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    borderRadius: 4,
                }}
            >
                {/* Wallet Header */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <AccountBalanceWalletIcon
                        sx={{
                            fontSize: 40,
                            color: theme.palette.primary.main
                        }}
                    />
                    <Typography variant="h6">
                        Phantom Wallet
                    </Typography>
                </Stack>

                {/* Balance Display */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                        Current Balance
                    </Typography>
                    <motion.div
                        key={balance}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold'
                            }}
                        >
                            {balance.toFixed(2)} SOL
                        </Typography>
                    </motion.div>
                </Box>

                {/* Profit Stream */}
                <Box sx={{ position: 'relative', height: 150, mb: 2 }}>
                    <AnimatePresence>
                        {profits.map((profit, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: -50, y: 100, opacity: 0 }}
                                animate={{ x: index * 70, y: 0, opacity: 1 }}
                                exit={{ y: -100, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                <ArrowUpwardIcon sx={{ color: theme.palette.success.main }} />
                                <Typography
                                    color="success.main"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    +{profit.toFixed(2)}
                                </Typography>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Box>

                {/* Total Profit Display */}
                <Box
                    sx={{
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 2,
                        background: alpha(theme.palette.success.main, 0.1)
                    }}
                >
                    <Typography variant="body1" color="text.secondary">
                        Total Profit
                    </Typography>
                    <motion.div
                        key={totalProfit}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Typography
                            variant="h5"
                            color="success.main"
                            sx={{ fontWeight: 'bold' }}
                        >
                            +{totalProfit.toFixed(2)} SOL
                        </Typography>
                    </motion.div>
                </Box>
            </Paper>
        </Box>
    );
};

export default ProfitVisualization; 