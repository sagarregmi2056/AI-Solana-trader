import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Chip, Stack, IconButton, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CloseIcon from '@mui/icons-material/Close';
import RadarIcon from '@mui/icons-material/Radar';
import { alpha, useTheme } from '@mui/material/styles';

const AITokenAnalysis = () => {
    const theme = useTheme();
    const [notifications, setNotifications] = useState([]);
    const [scanning, setScanning] = useState(true);
    const [currentAnalysis, setCurrentAnalysis] = useState(null);

    const mockTokens = [
        { name: 'PEPE', risk: 'low', confidence: 92, liquidity: '500K SOL' },
        { name: 'DOGE', risk: 'medium', confidence: 78, liquidity: '1.2M SOL' },
        { name: 'SHIB', risk: 'low', confidence: 88, liquidity: '800K SOL' },
    ];

    const aiAnalysis = [
        "Analyzing token contract for potential vulnerabilities...",
        "Checking liquidity pool depth and distribution...",
        "Verifying team wallet concentration...",
        "Examining trading patterns for manipulation...",
        "Evaluating social sentiment and community growth..."
    ];

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < aiAnalysis.length) {
                setCurrentAnalysis(aiAnalysis[currentIndex]);
                currentIndex++;
            } else {
                currentIndex = 0;
            }
        }, 2000);

        // Simulate new token notifications
        const notificationInterval = setInterval(() => {
            const token = mockTokens[Math.floor(Math.random() * mockTokens.length)];
            const newNotification = {
                id: Date.now(),
                token: token.name,
                message: `New ${token.risk} risk opportunity detected with ${token.confidence}% confidence score. Liquidity: ${token.liquidity}`,
                type: token.risk === 'low' ? 'success' : 'warning'
            };

            setNotifications(prev => [newNotification, ...prev].slice(0, 3));
            // Play notification sound if available
            try {
                new Audio('/notification.mp3').play();
            } catch (error) {
                console.log('Notification sound not available');
            }
        }, 8000);

        return () => {
            clearInterval(interval);
            clearInterval(notificationInterval);
        };
    }, []);

    return (
        <Box sx={{ py: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 600,
                    mx: 'auto',
                    p: 4,
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Scanning Effect */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        overflow: 'hidden',
                        pointerEvents: 'none'
                    }}
                >
                    {/* Pulse Effect */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.1, 0.3]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />

                    {/* Scanning Line */}
                    <motion.div
                        animate={{
                            top: ['0%', '100%', '0%']
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: '100%',
                            height: '2px',
                            background: `linear-gradient(90deg, 
                                transparent 0%, 
                                ${alpha(theme.palette.primary.main, 0.5)} 50%, 
                                transparent 100%
                            )`,
                            boxShadow: `0 0 8px ${theme.palette.primary.main}`,
                            zIndex: 1
                        }}
                    />
                </Box>

                {/* AI Scanner Header */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                    <Box sx={{ position: 'relative' }}>
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <RadarIcon
                                sx={{
                                    fontSize: 40,
                                    color: theme.palette.primary.main,
                                }}
                            />
                        </motion.div>
                        {/* Radar Circles */}
                        {[1, 2, 3].map((index) => (
                            <motion.div
                                key={index}
                                animate={{
                                    scale: [1, 2],
                                    opacity: [0.5, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.3,
                                    ease: "easeOut"
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                        ))}
                    </Box>
                    <Typography variant="h5">AI Token Scanner</Typography>
                </Stack>

                {/* Current Analysis Display with enhanced animation */}
                <Box sx={{ mb: 4, position: 'relative' }}>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentAnalysis}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    color: theme.palette.primary.main,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    position: 'relative',
                                    zIndex: 2
                                }}
                            >
                                <SecurityIcon />
                                {currentAnalysis}
                            </Typography>
                        </motion.div>
                    </AnimatePresence>
                </Box>

                {/* Security Metrics */}
                <Stack direction="row" spacing={2} sx={{ mb: 4, position: 'relative', zIndex: 2 }}>
                    <Chip
                        icon={<CheckCircleIcon />}
                        label="Contract Verified"
                        color="success"
                        variant="outlined"
                    />
                    <Chip
                        icon={<SecurityIcon />}
                        label="Liquidity Locked"
                        color="success"
                        variant="outlined"
                    />
                    <Chip
                        icon={<WarningIcon />}
                        label="Risk Analysis"
                        color="warning"
                        variant="outlined"
                    />
                </Stack>

                {/* Live Notifications */}
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        <NotificationsActiveIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Live Alerts
                    </Typography>
                    <Stack spacing={2}>
                        <AnimatePresence>
                            {notifications.map((notification) => (
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 100 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Alert
                                        severity={notification.type}
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => setNotifications(prev =>
                                                    prev.filter(n => n.id !== notification.id)
                                                )}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        <Typography variant="subtitle2">
                                            {notification.token}
                                        </Typography>
                                        {notification.message}
                                    </Alert>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
};

export default AITokenAnalysis; 