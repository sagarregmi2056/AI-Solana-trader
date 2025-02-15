import React from 'react';
import { Box, Typography, Chip, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WarningIcon from '@mui/icons-material/Warning';
import { alpha, useTheme } from '@mui/material/styles';

const ComingSoon = () => {
    const theme = useTheme();

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999,
                    background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.95)}, ${alpha(theme.palette.secondary.main, 0.95)})`,
                    py: 1,
                    px: 2,
                    textAlign: 'center',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}
            >
                <Typography
                    variant="body1"
                    color="white"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                    }}
                >
                    <RocketLaunchIcon />
                    Coming Soon - Join our waitlist for early access!
                    <Chip
                        label="Development Mode"
                        size="small"
                        sx={{
                            ml: 2,
                            background: alpha('#fff', 0.2),
                            color: 'white',
                            '&:hover': { background: alpha('#fff', 0.3) }
                        }}
                    />
                </Typography>
                <Alert
                    severity="warning"
                    icon={<WarningIcon />}
                    sx={{
                        background: 'transparent',
                        color: 'white',
                        border: `1px solid ${alpha('#fff', 0.3)}`,
                        '& .MuiAlert-icon': {
                            color: 'white'
                        }
                    }}
                >
                    <Typography variant="body2">
                        IMPORTANT: Do not connect your wallet during development mode. We will announce when the platform is live and secure.
                    </Typography>
                </Alert>
            </Box>
        </motion.div>
    );
};

export default ComingSoon; 