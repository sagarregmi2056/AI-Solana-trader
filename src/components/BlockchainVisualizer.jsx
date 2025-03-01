import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { alpha, useTheme } from '@mui/material/styles';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BlockchainVisualizer = () => {
    const theme = useTheme();
    const [blocks, setBlocks] = useState([]);
    const [transactions, setTransactions] = useState([]);

    // Simulate new blocks and transactions
    useEffect(() => {
        const blockInterval = setInterval(() => {
            const newBlock = {
                id: Date.now(),
                number: Math.floor(Math.random() * 1000000),
                transactions: Math.floor(Math.random() * 100),
                size: (Math.random() * 2 + 0.5).toFixed(2)
            };
            setBlocks(prev => [...prev.slice(-4), newBlock]);
        }, 3000);

        const txInterval = setInterval(() => {
            const newTx = {
                id: Date.now(),
                from: `${Math.random().toString(36).substring(2, 8)}...`,
                to: `${Math.random().toString(36).substring(2, 8)}...`,
                amount: (Math.random() * 10).toFixed(2)
            };
            setTransactions(prev => [...prev.slice(-3), newTx]);
        }, 2000);

        return () => {
            clearInterval(blockInterval);
            clearInterval(txInterval);
        };
    }, []);

    return (
        <Box sx={{ py: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 800,
                    mx: 'auto',
                    p: 4,
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Blockchain Network Visualization */}
                <Box sx={{ mb: 4, position: 'relative' }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Live Blockchain Activity
                    </Typography>

                    {/* Blocks */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                        <AnimatePresence mode='popLayout'>
                            {blocks.map((block) => (
                                <motion.div
                                    key={block.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Paper
                                        sx={{
                                            p: 2,
                                            background: alpha(theme.palette.primary.main, 0.1),
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                            borderRadius: 2,
                                            minWidth: 150
                                        }}
                                    >
                                        <Typography variant="subtitle2" color="primary">
                                            Block #{block.number}
                                        </Typography>
                                        <Typography variant="body2">
                                            Txs: {block.transactions}
                                        </Typography>
                                        <Typography variant="body2">
                                            Size: {block.size}MB
                                        </Typography>
                                    </Paper>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </Box>

                    {/* Live Transactions */}
                    <Box sx={{ position: 'relative' }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Live Transactions
                        </Typography>
                        <AnimatePresence>
                            {transactions.map((tx) => (
                                <motion.div
                                    key={tx.id}
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 100, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Paper
                                        sx={{
                                            p: 2,
                                            mb: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            background: alpha(theme.palette.success.main, 0.05),
                                            border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`
                                        }}
                                    >
                                        <AccountBalanceWalletIcon color="primary" />
                                        <Typography variant="body2">
                                            {tx.from}
                                        </Typography>
                                        <SwapHorizIcon />
                                        <Typography variant="body2">
                                            {tx.to}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="success.main"
                                            sx={{ ml: 'auto' }}
                                        >
                                            {tx.amount} SOL
                                        </Typography>
                                        <CheckCircleIcon color="success" />
                                    </Paper>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </Box>

                    {/* Network Lines */}
                    {[...Array(5)].map((_, index) => (
                        <motion.div
                            key={`line-${index}`}
                            animate={{
                                opacity: [0.1, 0.3, 0.1],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.4
                            }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '200%',
                                height: '200%',
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                borderRadius: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    ))}
                </Box>
            </Paper>
        </Box>
    );
};

export default BlockchainVisualizer; 