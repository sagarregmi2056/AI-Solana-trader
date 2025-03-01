import React, { useState, useEffect } from 'react';
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, Chip, Box, Typography, IconButton, Tooltip, Alert, Link,
    TextField, InputAdornment, Dialog, DialogTitle, DialogContent,
    CircularProgress, Switch, FormControlLabel, Container, Stack, List, ListItem, ListItemText, ListItemSecondaryAction,
    Grid, Divider
} from '@mui/material';
import {
    ArrowUpward, ArrowDownward, TokenOutlined, InfoOutlined,
    Timeline, LocalAtm, OpenInNew, Search, TrendingUp, ShowChart,
    AutoMode, Cancel, TrendingDown, Warning, CheckCircle
} from '@mui/icons-material';
import useSound from 'use-sound';
import notificationSound from '../assets/notification.mp3';
import TokenAnalysis from '../components/TokenAnalysis';
import { alpha, useTheme } from '@mui/material/styles';
import { useWebSocket } from '../hooks/useWebSocket';

const TokenMonitor = () => {
    const theme = useTheme();
    const [trendingTokens, setTrendingTokens] = useState([]);
    const [selectedToken, setSelectedToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [play] = useSound(notificationSound, { volume: 0.5 });
    const [searchQuery, setSearchQuery] = useState('');
    const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });
    const [settings, setSettings] = useState(null);
    const [autoTrading, setAutoTrading] = useState({});
    const [tradingStatus, setTradingStatus] = useState({});
    const [tokenAddress, setTokenAddress] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);
    const [analysisLoading, setAnalysisLoading] = useState(false);
    const [analysisError, setAnalysisError] = useState(null);

    const fetchTrendingTokens = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://147.182.229.96:3000/api/tokens/trending');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched tokens:', data);
            if (data && Array.isArray(data.data)) {
                setTrendingTokens(data.data);
            } else {
                console.error('Invalid data format:', data);
                setError('Invalid data format received');
            }
        } catch (err) {
            console.error('Error fetching trending tokens:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrendingTokens();

        // Poll every 30 seconds
        const interval = setInterval(fetchTrendingTokens, 30000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const response = await fetch('http://147.182.229.96:3000/api/settings');
            if (response.ok) {
                const data = await response.json();
                setSettings(data);
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    };

    const handleTokenSelect = async (token) => {
        try {
            setSelectedToken(token);
            setAnalysisLoading(true);
            setAnalysisError(null);

            console.log('Fetching analysis for token:', token.address);

            const [analysisResponse, aiAnalysisResponse] = await Promise.all([
                fetch(`http://147.182.229.96:3000/api/tokens/${token.address}/analysis`),
                fetch(`http://147.182.229.96:3000/api/tokens/${token.address}/ai-analysis`)
            ]);

            console.log('Analysis response status:', analysisResponse.status);
            console.log('AI Analysis response status:', aiAnalysisResponse.status);

            const analysisResult = await analysisResponse.json();
            const aiAnalysisResult = await aiAnalysisResponse.json();

            console.log('Analysis data received:', analysisResult);
            console.log('AI Analysis data received:', aiAnalysisResult);

            if (!analysisResult.data || !aiAnalysisResult.data) {
                throw new Error('Invalid data format received');
            }

            setAnalysisData({
                tokenMetrics: analysisResult.data.tokenMetrics,
                riskScore: analysisResult.data.riskScore,
                warnings: analysisResult.data.warnings,
                analysis: aiAnalysisResult.data.analysis,
                recommendations: aiAnalysisResult.data.recommendations,
                lastUpdated: aiAnalysisResult.data.lastUpdated
            });

        } catch (error) {
            console.error('Error fetching analysis:', error);
            setAnalysisError(error.message || 'Failed to fetch analysis data');
        } finally {
            setAnalysisLoading(false);
        }
    };

    const handleCloseAnalysis = () => {
        setSelectedToken(null);
        setAnalysisData(null);
        setAnalysisError(null);
    };

    const handleTradeClick = (token) => {
        setSelectedToken(token);
        setTradeDialogOpen(true);
    };

    const filteredTokens = Array.isArray(trendingTokens) ? trendingTokens.filter(token =>
        token && (
            token.symbol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ) : [];

    // Sort tokens based on current config
    const sortedTokens = [...filteredTokens].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key] || 0;
        const bValue = b[sortConfig.key] || 0;
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

    const TradeDialog = () => (
        <Dialog open={tradeDialogOpen} onClose={() => setTradeDialogOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>
                Trade {selectedToken?.symbol}
                <Typography variant="subtitle2" color="textSecondary">
                    Current Price: {formatNumber(selectedToken?.price)}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Market Analysis</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography>24h Volume: {formatNumber(selectedToken?.volume24h)}</Typography>
                        <Typography>Liquidity: {formatNumber(selectedToken?.liquidity)}</Typography>
                        <Typography>24h Change: {formatPercent(selectedToken?.priceChange24h)}</Typography>

                        {settings?.enableAITrading && (
                            <Box sx={{ mt: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={autoTrading[selectedToken?.address] || false}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    startAutoTrading(selectedToken);
                                                } else {
                                                    stopAutoTrading(selectedToken);
                                                }
                                            }}
                                            color="primary"
                                        />
                                    }
                                    label="Auto Trading"
                                />

                                {tradingStatus[selectedToken?.address] && (
                                    <Box sx={{ mt: 1 }}>
                                        <Typography>
                                            Status: {tradingStatus[selectedToken?.address].status}
                                        </Typography>
                                        <Typography>
                                            Entry Price: {formatNumber(tradingStatus[selectedToken?.address].entryPrice)}
                                        </Typography>
                                        <Typography>
                                            Current PnL: {formatPercent(tradingStatus[selectedToken?.address].pnl)}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );

    const renderActions = (token) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
                variant="contained"
                size="small"
                startIcon={<Timeline />}
                sx={{
                    backgroundColor: '#6E56CF',
                    '&:hover': { backgroundColor: '#7C66DD' }
                }}
                onClick={() => window.open(token.url, '_blank')}
            >
                Chart
            </Button>
            <Button
                variant="contained"
                size="small"
                startIcon={autoTrading[token.address] ? <AutoMode /> : <LocalAtm />}
                sx={{
                    backgroundColor: autoTrading[token.address] ? '#4CAF50' : '#6E56CF',
                    '&:hover': { backgroundColor: autoTrading[token.address] ? '#45a049' : '#7C66DD' }
                }}
                onClick={() => handleTradeClick(token)}
            >
                {autoTrading[token.address] ? 'Auto' : 'Trade'}
            </Button>
        </Box>
    );

    const handleAnalyze = () => {
        if (tokenAddress) {
            setIsAnalyzing(true);
        }
    };

    const formatNumber = (number) => {
        if (!number) return '0';
        if (number >= 1_000_000_000) return `$${(number / 1_000_000_000).toFixed(2)}B`;
        if (number >= 1_000_000) return `$${(number / 1_000_000).toFixed(2)}M`;
        if (number >= 1_000) return `$${(number / 1_000).toFixed(2)}K`;
        return `$${number.toFixed(number < 0.01 ? 6 : 2)}`;
    };

    const formatPercent = (number) => {
        if (!number) return '0%';
        return `${number >= 0 ? '+' : ''}${number.toFixed(2)}%`;
    };

    const startAutoTrading = async (token) => {
        try {
            const response = await fetch('http://147.182.229.96:3000/api/trading/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tokenAddress: token.address,
                    settings: {
                        maxInvestment: settings.maxInvestmentPerTrade,
                        takeProfit: settings.takeProfitPercentage,
                        stopLoss: settings.stopLossPercentage
                    }
                })
            });

            if (response.ok) {
                setAutoTrading(prev => ({
                    ...prev,
                    [token.address]: true
                }));
                play(); // Play notification sound
            }
        } catch (error) {
            console.error('Failed to start trading:', error);
        }
    };

    const stopAutoTrading = async (token) => {
        try {
            await fetch(`http://147.182.229.96:3000/api/trading/stop/${token.address}`, {
                method: 'POST'
            });

            setAutoTrading(prev => ({
                ...prev,
                [token.address]: false
            }));
        } catch (error) {
            console.error('Failed to stop trading:', error);
        }
    };

    const updateTradingStatus = (status) => {
        setTradingStatus(prev => ({
            ...prev,
            [status.tokenAddress]: status
        }));
    };

    const requestSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key === columnKey) {
            return sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />;
        }
        return null;
    };

    // WebSocket message handler
    const handleWebSocketMessage = (message) => {
        try {
            const data = typeof message === 'string' ? JSON.parse(message) : message;
            if (data.type === 'token_update' && Array.isArray(data.data)) {
                console.log('Received token update:', data.data);
                setTrendingTokens(data.data);
            }
        } catch (error) {
            console.error('Error handling WebSocket message:', error);
        }
    };

    // Initialize WebSocket connection
    useWebSocket(handleWebSocketMessage);

    const renderAnalysisDialog = () => {
        if (!selectedToken) return null;

        return (
            <Dialog
                open={!!selectedToken}
                onClose={handleCloseAnalysis}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    {selectedToken?.name} ({selectedToken?.symbol}) Analysis
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseAnalysis}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <Cancel />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {analysisLoading ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                        </Box>
                    ) : analysisError ? (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {analysisError}
                        </Alert>
                    ) : analysisData && (
                        <Box>
                            {/* Price Information */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Price & Volume
                                </Typography>
                                <Stack direction="row" spacing={2} mt={1}>
                                    <Chip
                                        icon={<LocalAtm />}
                                        label={`$${analysisData.tokenMetrics.price?.toFixed(6) || '0.00'}`}
                                        color="primary"
                                        variant="outlined"
                                    />
                                    <Chip
                                        icon={analysisData.tokenMetrics.priceChange24h > 0 ? <TrendingUp /> : <TrendingDown />}
                                        label={`${analysisData.tokenMetrics.priceChange24h?.toFixed(2) || '0'}%`}
                                        color={analysisData.tokenMetrics.priceChange24h > 0 ? "success" : "error"}
                                        variant="outlined"
                                    />
                                    <Chip
                                        icon={<Timeline />}
                                        label={`Vol: $${analysisData.tokenMetrics.volume24h?.toLocaleString() || '0'}`}
                                        variant="outlined"
                                    />
                                </Stack>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Analysis Categories */}
                            <Grid container spacing={2}>
                                {analysisData.analysis.map((item, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Paper elevation={1} sx={{ p: 2 }}>
                                            <Typography variant="subtitle1" color="primary" gutterBottom>
                                                {item.category}
                                            </Typography>
                                            <Chip
                                                icon={item.status.toLowerCase().includes('safe') ? <CheckCircle /> : <Warning />}
                                                label={item.status}
                                                color={
                                                    item.status.toLowerCase().includes('safe') ? 'success' :
                                                        item.status.toLowerCase().includes('risk') ? 'warning' : 'default'
                                                }
                                                sx={{ mb: 1 }}
                                            />
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                {item.details}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                                                Confidence: {item.confidence}%
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Recommendations */}
                            {analysisData.recommendations && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                        Recommendations
                                    </Typography>
                                    <Alert severity="info">
                                        <List dense>
                                            {analysisData.recommendations.map((rec, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText primary={rec} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Alert>
                                </Box>
                            )}
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        );
    };

    if (loading && trendingTokens.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg">
                <Alert
                    severity="error"
                    sx={{ mt: 4 }}
                    action={
                        <Button color="inherit" size="small" onClick={fetchTrendingTokens}>
                            Retry
                        </Button>
                    }
                >
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        background: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: 'blur(20px)',
                        borderRadius: 2
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Trending Tokens
                    </Typography>

                    {trendingTokens.length === 0 ? (
                        <Alert severity="info">No trending tokens found</Alert>
                    ) : (
                        <List>
                            {trendingTokens.map((token) => (
                                <ListItem
                                    key={token.address}
                                    button
                                    onClick={() => handleTokenSelect(token)}
                                    sx={{
                                        mb: 1,
                                        borderRadius: 1,
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.primary.main, 0.1)
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1">
                                                {token.name} ({token.symbol})
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="text.secondary">
                                                ${parseFloat(token.price).toFixed(6)}
                                            </Typography>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <Chip
                                            icon={token.priceChange24h > 0 ? <TrendingUp /> : <TrendingDown />}
                                            label={`${parseFloat(token.priceChange24h).toFixed(2)}%`}
                                            color={token.priceChange24h > 0 ? "success" : "error"}
                                            sx={{ mr: 1 }}
                                        />
                                        <Chip
                                            label={`Vol: $${parseInt(token.volume24h).toLocaleString()}`}
                                            variant="outlined"
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Paper>
            </Box>

            {renderAnalysisDialog()}

            {/* Trade Dialog */}
            {tradeDialogOpen && <TradeDialog />}
        </Container>
    );
};

export default TokenMonitor;
