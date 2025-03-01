import React from 'react';
import { Box, Container } from '@mui/material';
import WalletButton from './WalletButton';

const Layout = ({ children }) => {
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <WalletButton />
            </Box>
            <Container maxWidth="lg" sx={{ flex: 1 }}>
                {children}
            </Container>
        </Box>
    );
};

export default Layout;
