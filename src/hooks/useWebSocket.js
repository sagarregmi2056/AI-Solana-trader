import { useEffect } from 'react';
import WebSocketService from '../services/WebSocketService';

export const useWebSocket = (onMessage) => {
    useEffect(() => {
        // Add message listener
        WebSocketService.addListener(onMessage);

        // Cleanup on unmount
        return () => {
            WebSocketService.removeListener(onMessage);
        };
    }, [onMessage]);
}; 