import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { endpoint, walletConfig } from './config/wallet';
import ErrorBoundary from './components/ErrorBoundary';
import { darkTheme } from './theme';

// Import your components
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import TokenMonitor from './pages/TokenMonitor';
import Settings from './pages/Settings';

// Import wallet styles
import '@solana/wallet-adapter-react-ui/styles.css';

// Create a client
const queryClient = new QueryClient();

function AppContent() {
  return (
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
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider {...walletConfig}>
            <WalletModalProvider>
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <AppContent />
              </ThemeProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;