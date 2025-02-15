import React, { useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    useTheme,
    alpha,
    AppBar,
    Toolbar,
    Stack,
    IconButton,
    TextField,
    Alert
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TimelineIcon from '@mui/icons-material/Timeline';
import SearchIcon from '@mui/icons-material/Search';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PaidIcon from '@mui/icons-material/Paid';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import ChatIcon from '@mui/icons-material/Chat';
import TimerIcon from '@mui/icons-material/Timer';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import WalletButton from '../components/WalletButton';
import ParticleBackground from '../components/ParticleBackground';
import ProfitVisualization from '../components/ProfitVisualization';
import AITokenAnalysis from '../components/AITokenAnalysis';

function LandingPage() {
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    const features = [
        {
            icon: <AutoAwesomeIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: 'AI-Powered Trading',
            description: 'Our advanced AI analyzes market patterns, predicts token performance, and executes trades at optimal moments.'
        },
        {
            icon: <ShowChartIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: 'Real-Time Analysis',
            description: 'Lightning-fast detection of new token launches with instant analysis of potential opportunities.'
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: 'Smart Risk Management',
            description: 'Automated risk assessment and protection against rugpulls and scam tokens.'
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: 'Priority Execution',
            description: 'Beat the competition with our priority transaction system and MEV protection.'
        }
    ];

    const workingSteps = [
        {
            icon: <SearchIcon sx={{ fontSize: 40, color: '#fff' }} />,
            title: 'Token Detection',
            description: 'AI constantly monitors DEXs for new token launches',
            color: '#FF6B6B'
        },
        {
            icon: <TimelineIcon sx={{ fontSize: 40, color: '#fff' }} />,
            title: 'Analysis',
            description: 'Smart algorithms analyze token metrics and contract safety',
            color: '#4ECDC4'
        },
        {
            icon: <AutoGraphIcon sx={{ fontSize: 40, color: '#fff' }} />,
            title: 'Decision',
            description: 'AI determines optimal entry points and risk levels',
            color: '#45B7D1'
        },
        {
            icon: <PaidIcon sx={{ fontSize: 40, color: '#fff' }} />,
            title: 'Execution',
            description: 'Lightning-fast trade execution with MEV protection',
            color: '#96C93D'
        }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Particle Background */}
            <ParticleBackground />

            {/* Gradient Overlay */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                zIndex: 1
            }} />

            {/* Content Container */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                {/* Header */}
                <AppBar position="fixed" sx={{
                    background: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: 'blur(20px)'
                }}>
                    <Container maxWidth="lg">
                        <Toolbar sx={{ justifyContent: 'space-between' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 700
                                }}
                            >
                                SolanaAI Sniper
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                                <WalletButton />
                            </Stack>
                        </Toolbar>
                    </Container>
                </AppBar>

                {/* Enhanced Hero Section */}
                <Container maxWidth="lg">
                    <Box sx={{
                        pt: 15,
                        pb: 8,
                        textAlign: 'center'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '4rem' },
                                    fontWeight: 700,
                                    mb: 2,
                                    background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                                }}
                            >
                                Trade Smarter with AI
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                    mb: 4,
                                    color: 'text.secondary'
                                }}
                            >
                                Automated Token Detection & Trading on Solana
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/dashboard')}
                                startIcon={<RocketLaunchIcon />}
                                sx={{
                                    py: 2,
                                    px: 4,
                                    fontSize: '1.2rem',
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    '&:hover': {
                                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
                                    }
                                }}
                            >
                                Launch App
                            </Button>
                        </motion.div>
                    </Box>

                    {/* Coming Soon Section */}
                    <Container maxWidth="lg" sx={{ py: 8 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Box
                                sx={{
                                    background: alpha(theme.palette.primary.main, 0.05),
                                    borderRadius: 4,
                                    p: 4,
                                    textAlign: 'center',
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Background Gradient Animation */}
                                <Box
                                    component={motion.div}
                                    animate={{
                                        background: [
                                            `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                                            `linear-gradient(225deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                                            `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
                                        ]
                                    }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 0
                                    }}
                                />

                                <Box sx={{ position: 'relative', zIndex: 1 }}>
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <TimerIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                                    </motion.div>

                                    <Typography
                                        variant="h3"
                                        sx={{
                                            mb: 2,
                                            background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Coming Soon
                                    </Typography>

                                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                                        Our AI-powered trading platform is in development. Join the waitlist to get early access!
                                    </Typography>

                                    <Box
                                        component="form"
                                        sx={{
                                            display: 'flex',
                                            gap: 2,
                                            maxWidth: 500,
                                            mx: 'auto',
                                            mb: 3
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Enter your email"
                                            InputProps={{
                                                startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    background: alpha(theme.palette.background.paper, 0.5),
                                                    backdropFilter: 'blur(10px)'
                                                }
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                                '&:hover': {
                                                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
                                                }
                                            }}
                                        >
                                            Join Waitlist
                                        </Button>
                                    </Box>

                                    <Alert
                                        severity="warning"
                                        sx={{
                                            maxWidth: 600,
                                            mx: 'auto',
                                            background: alpha(theme.palette.warning.main, 0.1),
                                            border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                                        }}
                                    >
                                        <Typography variant="body2">
                                            Currently in development mode. Do not connect your wallet. We will announce when the platform is live and secure.
                                        </Typography>
                                    </Alert>
                                </Box>
                            </Box>
                        </motion.div>
                    </Container>

                    {/* Enhanced Working Mechanism Section */}
                    <Container maxWidth="lg" sx={{ py: 12 }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Typography
                                variant="h3"
                                align="center"
                                sx={{
                                    mb: 8,
                                    background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                How It Works
                            </Typography>
                        </motion.div>

                        {/* Animated Connecting Line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '100px',
                                    left: '10%',
                                    right: '10%',
                                    height: '2px',
                                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    zIndex: 0,
                                    transformOrigin: 'left'
                                }}
                            />
                        </motion.div>

                        {/* Steps with enhanced animations */}
                        <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
                            {workingSteps.map((step, index) => (
                                <Grid item xs={12} md={3} key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 360 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        background: step.color,
                                                        mb: 2,
                                                        boxShadow: `0 8px 16px ${alpha(step.color, 0.3)}`,
                                                        '&:hover': {
                                                            boxShadow: `0 12px 24px ${alpha(step.color, 0.4)}`
                                                        }
                                                    }}
                                                >
                                                    {step.icon}
                                                </Box>
                                            </motion.div>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    mb: 1,
                                                    background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent'
                                                }}
                                            >
                                                {step.title}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {step.description}
                                            </Typography>
                                        </Box>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>

                    {/* After the Working Mechanism Section */}
                    <Container maxWidth="lg" sx={{ py: 8 }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Typography
                                variant="h3"
                                align="center"
                                sx={{
                                    mb: 4,
                                    background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                Watch Your Profits Grow
                            </Typography>
                            <Typography
                                variant="h6"
                                align="center"
                                color="text.secondary"
                                sx={{ mb: 6 }}
                            >
                                Real-time profit tracking with our AI-powered trading system
                            </Typography>
                        </motion.div>

                        <ProfitVisualization />
                    </Container>

                    {/* Features Section */}
                    <Grid container spacing={4} sx={{ py: 8 }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={6} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        background: alpha(theme.palette.background.paper, 0.8),
                                        backdropFilter: 'blur(20px)',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}`
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Box sx={{ mb: 2 }}>
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Stats Section */}
                    <Box sx={{ py: 8, textAlign: 'center' }} data-aos="fade-up">
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Typography variant="h3" sx={{ mb: 1, color: theme.palette.primary.main }}>
                                        $10M+
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Trading Volume
                                    </Typography>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Typography variant="h3" sx={{ mb: 1, color: theme.palette.primary.main }}>
                                        1000+
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Active Traders
                                    </Typography>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Typography variant="h3" sx={{ mb: 1, color: theme.palette.primary.main }}>
                                        85%
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Success Rate
                                    </Typography>
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* CTA Section */}
                    <Box
                        sx={{
                            py: 12,
                            textAlign: 'center',
                            background: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: 4,
                            mb: 8
                        }}
                        data-aos="fade-up"
                    >
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Ready to Start Trading?
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                            Join thousands of traders using AI to maximize their profits
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/dashboard')}
                            sx={{
                                py: 2,
                                px: 4,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                '&:hover': {
                                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
                                }
                            }}
                        >
                            Get Started Now
                        </Button>
                    </Box>
                </Container>

                {/* AI-Powered Token Analysis Section */}
                <Container maxWidth="lg" sx={{ py: 8 }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="h3"
                            align="center"
                            sx={{
                                mb: 4,
                                background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            AI-Powered Token Analysis
                        </Typography>
                        <Typography
                            variant="h6"
                            align="center"
                            color="text.secondary"
                            sx={{ mb: 6 }}
                        >
                            Real-time token scanning and risk assessment
                        </Typography>
                    </motion.div>

                    <AITokenAnalysis />
                </Container>

                {/* Footer */}
                <Box
                    sx={{
                        background: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: 'blur(20px)',
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 6
                    }}
                >
                    <Container maxWidth="lg">
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontWeight: 700,
                                        mb: 2
                                    }}
                                >
                                    SolanaAI Sniper
                                </Typography>
                                <Typography color="text.secondary" sx={{ mb: 2 }}>
                                    Advanced AI-powered trading platform for Solana tokens
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    <IconButton color="primary" component="a" href="https://x.com/sagarre89519673" target="_blank">
                                        <TwitterIcon />
                                    </IconButton>
                                    <IconButton color="primary" component="a" href="https://t.me/+q2Ynt3snYXA1ZmE1" target="_blank">
                                        <TelegramIcon />
                                    </IconButton>
                                    <IconButton color="primary" component="a" href="porfolio-cf.vercel.app" target="_blank">
                                        <ChatIcon />
                                    </IconButton>
                                    <IconButton color="primary" component="a" href="https://github.com/sagarregmi2056" target="_blank">
                                        <GitHubIcon />
                                    </IconButton>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" sx={{ mb: 2 }}>Quick Links</Typography>
                                <Stack spacing={1}>
                                    <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                                    <Button color="inherit" onClick={() => navigate('/monitor')}>Token Monitor</Button>
                                    <Button color="inherit" onClick={() => navigate('/settings')}>Settings</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" sx={{ mb: 2 }}>Contact</Typography>
                                <Typography color="text.secondary" sx={{ mb: 1 }}>
                                    Email: sagarregmi2056@gmail.com
                                </Typography>
                                <Typography color="text.secondary">
                                    Join our community for updates and support
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 4, pt: 4, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                            <Typography color="text.secondary" align="center">
                                © {new Date().getFullYear()} SolanaAI Sniper. All rights reserved.
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}

export default LandingPage; 