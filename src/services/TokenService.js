import axios from 'axios';
import { API_URL } from '../config';

class TokenService {
    // Token Data APIs
    async getTokenMetadata(address) {
        const response = await axios.get(`${API_URL}/tokens/${address}/metadata`);
        return response.data;
    }

    async getTokenPrice(address) {
        const response = await axios.get(`${API_URL}/tokens/${address}/price`);
        return response.data;
    }

    async getTokenAnalysis(address) {
        const response = await axios.get(`${API_URL}/tokens/${address}/analysis`);
        return response.data;
    }

    // Social Analysis APIs
    async getTwitterMetrics(address) {
        const response = await axios.get(`${API_URL}/tokens/${address}/social/twitter`);
        return response.data;
    }

    async getHighProfileMentions(address) {
        const response = await axios.get(`${API_URL}/tokens/${address}/social/mentions`);
        return response.data;
    }

    // Risk Analysis APIs
    async getRiskAnalysis(address) {
        const response = await axios.get(`${API_URL}/tokens/${address}/risk`);
        return response.data;
    }

    async getTokenHistory(address) {
        const response = await axios.get(`${API_URL}/tokens/${address}/history`);
        return response.data;
    }

    async getTokenVerifications(address) {
        const response = await axios.get(`${API_URL}/tokens/${address}/verifications`);
        return response.data;
    }

    // Add error handling wrapper
    async safeRequest(requestFn) {
        try {
            return await requestFn();
        } catch (error) {
            console.error('TokenService Error:', error);
            throw new Error(error.response?.data?.message || 'An error occurred while fetching token data');
        }
    }

    async getAIAnalysis(address) {
        try {
            const response = await axios.get(`${API_URL}/api/tokens/${address}/ai-analysis`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching AI analysis:', error);
            throw new Error('Failed to fetch AI analysis');
        }
    }
}

export default new TokenService(); 