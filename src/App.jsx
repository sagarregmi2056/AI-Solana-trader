import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TokenMonitor from './pages/TokenMonitor';
import Settings from './pages/Settings';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import LandingPage from './pages/LandingPage';

// Import styles directly
import '@solana/wallet-adapter-react-ui/styles.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C4DFF',
    },
    secondary: {
      main: '#69F0AE',
    },
  },
});

const queryClient = new QueryClient();

function App() {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={
                  <Layout>
                    <Dashboard />
                  </Layout>
                } />
                <Route path="/monitor" element={
                  <Layout>
                    <TokenMonitor />
                  </Layout>
                } />
                <Route path="/settings" element={
                  <Layout>
                    <Settings />
                  </Layout>
                } />
              </Routes>
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;