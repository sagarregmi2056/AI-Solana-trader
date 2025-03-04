import React, { useState, useEffect } from 'react';
import {
    Box, Paper, Typography, Chip, Stack, CircularProgress,
    Alert, AlertTitle, Divider, IconButton, Skeleton
} from '@mui/material';
import {
    TrendingUp, TrendingDown, Warning,
    CheckCircle, Timeline, LocalAtm, Close as CloseIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import TokenService from '../services/TokenService';
import { useWebSocket } from '../hooks/useWebSocket';

const TokenAnalysis = ({ tokenAddress, onRemove }) => {
    const theme = useTheme();
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchAnalysis = async () => {
            try {
                setLoading(true);
                setError(null);
                // console.log('Fetching analysis for:', tokenAddress);
                const data = await TokenService.getTokenAnalysis(tokenAddress);
                if (isMounted) {
                    setAnalysis(data);
                }
            } catch (err) {
                console.error('Error fetching analysis:', err);
                if (isMounted) {
                    setError(err.message || 'Failed to fetch token analysis');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchAnalysis();

        return () => {
            isMounted = false;
        };
    }, [tokenAddress]);

    // Handle real-time updates
    useWebSocket((message) => {
        if (message.type === 'token_update' && message.data.address === tokenAddress) {
            setAnalysis(prevAnalysis => ({
                ...prevAnalysis,
                ...message.data
            }));
        }
    });

    if (loading) {
        return (
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'relative' }}>
                <Stack spacing={2}>
                    <Skeleton variant="text" width="60%" height={32} />
                    <Skeleton variant="rectangular" height={60} />
                    <Skeleton variant="rectangular" height={40} />
                    <Skeleton variant="rectangular" height={80} />
                </Stack>
            </Paper>
        );
    }

    if (error) {
        return (
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'relative' }}>
                <IconButton
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        zIndex: 2
                    }}
                    onClick={onRemove}
                >
                    <CloseIcon />
                </IconButton>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            </Paper>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'relative' }}>
            {/* Remove Button */}
            <IconButton
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    zIndex: 2
                }}
                onClick={onRemove}
            >
                <CloseIcon />
            </IconButton>

            <Typography variant="h6" gutterBottom>
                {analysis?.name || 'Token Analysis'} ({analysis?.symbol})
            </Typography>

            {analysis && (
                <Stack spacing={2}>
                    {/* Price Information */}
                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Price & Volume
                        </Typography>
                        <Stack direction="row" spacing={2} mt={1}>
                            <Chip
                                icon={<LocalAtm />}
                                label={`$${analysis.price?.toFixed(6) || '0.00'}`}
                                color="primary"
                                variant="outlined"
                            />
                            <Chip
                                icon={analysis.priceChange24h > 0 ? <TrendingUp /> : <TrendingDown />}
                                label={`${analysis.priceChange24h?.toFixed(2) || '0'}%`}
                                color={analysis.priceChange24h > 0 ? "success" : "error"}
                                variant="outlined"
                            />
                            <Chip
                                icon={<Timeline />}
                                label={`Vol: $${analysis.volume24h?.toLocaleString() || '0'}`}
                                variant="outlined"
                            />
                        </Stack>
                    </Box>

                    <Divider />

                    {/* Risk Analysis */}
                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Risk Assessment
                        </Typography>
                        <Box mt={1}>
                            <Chip
                                icon={analysis.riskScore > 50 ? <Warning /> : <CheckCircle />}
                                label={`Risk Score: ${analysis.riskScore}`}
                                color={analysis.riskScore > 50 ? "warning" : "success"}
                                sx={{ mr: 1, mb: 1 }}
                            />
                        </Box>
                    </Box>

                    {/* Warnings */}
                    {analysis.warnings && analysis.warnings.length > 0 && (
                        <Alert severity="warning">
                            <AlertTitle>Warnings</AlertTitle>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                                {analysis.warnings.map((warning, index) => (
                                    <li key={index}>{warning}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}

                    {/* Positive Signals */}
                    {analysis.positiveSignals && analysis.positiveSignals.length > 0 && (
                        <Alert severity="success">
                            <AlertTitle>Positive Signals</AlertTitle>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                                {analysis.positiveSignals.map((signal, index) => (
                                    <li key={index}>{signal}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}

                    {/* AI Recommendation */}
                    {analysis.tradingRecommendation && (
                        <Alert
                            severity={
                                analysis.tradingRecommendation === 'BUY' ? 'success' :
                                    analysis.tradingRecommendation === 'SELL' ? 'error' : 'info'
                            }
                        >
                            <AlertTitle>AI Recommendation</AlertTitle>
                            {analysis.tradingRecommendation} - {analysis.aiSentiment}
                        </Alert>
                    )}

                    <Typography variant="caption" color="text.secondary">
                        Last Updated: {new Date(analysis.lastUpdated).toLocaleString()}
                    </Typography>
                </Stack>
            )}
        </Paper>
    );
};

export default TokenAnalysis; 