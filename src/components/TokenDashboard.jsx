import React, { useState, useEffect } from 'react';
import TokenService from '../services/TokenService';
import { useWebSocket } from '../hooks/useWebSocket';
import AITokenAnalysis from './AITokenAnalysis';

const TokenDashboard = ({ contractAddress, symbol }) => {
    const [tokenData, setTokenData] = useState({
        metadata: null,
        price: null,
        analysis: null,
        twitter: null,
        highProfile: null,
        risk: null,
        history: null,
        verifications: null,
        aiAnalysis: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [
                    metadata,
                    price,
                    analysis,
                    twitter,
                    highProfile,
                    risk,
                    history,
                    verifications,
                    aiAnalysis
                ] = await Promise.all([
                    TokenService.getTokenMetadata(contractAddress),
                    TokenService.getTokenPrice(contractAddress),
                    TokenService.getTokenAnalysis(contractAddress),
                    TokenService.getTwitterMetrics(contractAddress),
                    TokenService.getHighProfileMentions(contractAddress),
                    TokenService.getRiskAnalysis(contractAddress),
                    TokenService.getTokenHistory(contractAddress),
                    TokenService.getTokenVerifications(contractAddress),
                    TokenService.getAIAnalysis(contractAddress)
                ]);

                setTokenData({
                    metadata,
                    price,
                    analysis,
                    twitter,
                    highProfile,
                    risk,
                    history,
                    verifications,
                    aiAnalysis
                });
            } catch (err) {
                setError(err.message);
                console.error('Error fetching token data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [contractAddress]);

    // Handle real-time updates
    useWebSocket((data) => {
        if (data.tokenAddress === contractAddress) {
            setTokenData(prev => ({
                ...prev,
                ...data.updates
            }));
        }
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="token-dashboard">
            {/* Token Metadata */}
            <section>
                <h2>Token Info</h2>
                <div>Name: {tokenData.metadata?.name}</div>
                <div>Symbol: {tokenData.metadata?.symbol}</div>
                <div>Price: ${tokenData.price?.current}</div>
            </section>

            {/* Risk Analysis */}
            <section>
                <h2>Risk Analysis</h2>
                <div>Risk Score: {tokenData.risk?.score}</div>
                <div>Warnings: {tokenData.risk?.warnings?.join(', ')}</div>
            </section>

            {/* Social Metrics */}
            <section>
                <h2>Social Activity</h2>
                <div>Twitter Mentions: {tokenData.twitter?.totalMentions}</div>
                <div>Verified Mentions: {tokenData.twitter?.verifiedMentions}</div>
            </section>

            {/* High Profile Mentions */}
            <section>
                <h2>High Profile Mentions</h2>
                <div>
                    {tokenData.highProfile?.map((mention, index) => (
                        <div key={index}>
                            <div>User: {mention.username}</div>
                            <div>Message: {mention.text}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Token History */}
            <section>
                <h2>History</h2>
                <div>
                    {tokenData.history?.map((event, index) => (
                        <div key={index}>
                            <div>Date: {new Date(event.timestamp).toLocaleString()}</div>
                            <div>Event: {event.type}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* AI Analysis */}
            <section>
                <h2>AI Analysis</h2>
                {tokenData.aiAnalysis && (
                    <AITokenAnalysis analysis={tokenData.aiAnalysis} />
                )}
            </section>
        </div>
    );
};

export default TokenDashboard; 