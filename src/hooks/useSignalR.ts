// src/hooks/useSignalR.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import { JobUpdateData } from '../types/susa';
import { useNotifications } from './useNotifications';

interface SignalRState {
    connection: signalR.HubConnection | null;
    isConnected: boolean;
}

// FIX: Match the backend Program.cs path ("/simulationHub")
const SIGNALR_BASE_URL = process.env.NEXT_PUBLIC_SIGNALR_URL;
// If base URL is provided, use it, otherwise default to local backend port
const HUB_URL = SIGNALR_BASE_URL 
    ? `${SIGNALR_BASE_URL}/simulationHub` 
    : 'http://localhost:5256/simulationHub';

export const useSignalR = (onJobUpdate: (data: JobUpdateData) => void) => {
    const [state, setState] = useState<SignalRState>({
        connection: null,
        isConnected: false,
    });
    const { addNotification } = useNotifications();

    const startConnection = useCallback(async () => {
        if (state.connection && state.isConnected) return;

        try {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl(HUB_URL, {
                    // Note: Since your backend requires Authentication for the Hub,
                    // you may need to provide an accessTokenFactory here if requests fail with 401.
                    // For now, we rely on the backend CORS allowing credentials if cookies are used,
                    // or we assume the backend might allow anonymous for negotiation if adjusted.
                    // If this fails with 401, you need to expose a Next.js API route to get the access token.
                })
                .withAutomaticReconnect()
                .build();

            // Setup listeners
            connection.on("JobUpdate", onJobUpdate);

            connection.onreconnecting(error => {
                console.warn(`SignalR connection lost. Attempting to reconnect... ${error}`);
                addNotification('Connection lost. Reconnecting...', 'info');
                setState(prev => ({ ...prev, isConnected: false }));
            });

            connection.onreconnected(() => {
                console.log(`SignalR reconnected.`);
                addNotification('Connection re-established.', 'success');
                setState(prev => ({ ...prev, isConnected: true }));
            });

            await connection.start();
            
            setState({ connection, isConnected: true });
            console.log(`SignalR Connected to ${HUB_URL}`);
            
        } catch (err: any) {
            // Only log/notify if it's not a page unload/abort
            if (err.name !== 'AbortError') {
                console.error("SignalR connection error:", err);
                // Optional: Don't spam notifications for initial connection failures in dev
                // addNotification('Could not connect to real-time service.', 'error');
                setTimeout(startConnection, 5000); // Retry connection
            }
        }
    }, [onJobUpdate, addNotification, state.connection, state.isConnected]);

    useEffect(() => {
        startConnection();
        
        // Cleanup on unmount
        return () => {
            if (state.connection) {
                state.connection.stop();
            }
        };
    }, [startConnection]);

    return state;
};