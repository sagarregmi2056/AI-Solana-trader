import { useState, useEffect } from 'react';
import WebSocketService from '../services/WebSocketService';

export const useWebSocketConnection = (onMessage) => {
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            setConnected(true);
            setError(null);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage?.(data);
            } catch (err) {
                console.error('Error parsing WebSocket message:', err);
            }
        };

        ws.onclose = () => {
            setConnected(false);
            setError('Connection lost');
        };

        ws.onerror = () => {
            setError('WebSocket error');
        };

        return () => {
            ws.close();
        };
    }, [onMessage]);

    return { connected, error };
}; 