// src/hooks/useSignalR.ts
'use client';

import { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { JobUpdateData } from '../types/susa';
import { useNotifications } from './useNotifications';

interface SignalRState {
  connection: signalR.HubConnection | null;
  isConnected: boolean;
}

const SIGNALR_BASE_URL = process.env.NEXT_PUBLIC_SIGNALR_URL;
const HUB_URL = SIGNALR_BASE_URL
  ? `${SIGNALR_BASE_URL}/simulationHub`
  : 'http://localhost:5256/simulationHub';

/**
 * Fetches the access token from our API endpoint.
 * Returns empty string if not authenticated (SignalR will connect without auth).
 */
async function fetchAccessToken(): Promise<string> {
  try {
    console.log('[SignalR] Fetching access token...');
    const response = await fetch('/api/auth/token', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store'  // Prevent caching
    });
    console.log('[SignalR] Response status:', response.status, response.statusText);

    const text = await response.text();
    console.log('[SignalR] Response body:', text);

    if (!response.ok) {
      console.warn('[SignalR] Token endpoint returned error:', response.status);
      return '';
    }

    const data = JSON.parse(text);
    const token = data.token || data.accessToken || '';
    console.log('[SignalR] Got token:', token ? `${token.substring(0, 20)}...` : '(empty)');
    return token;
  } catch (error) {
    console.error('[SignalR] Error fetching access token:', error);
    return '';
  }
}

export const useSignalR = (onJobUpdate: (data: JobUpdateData) => void) => {
  const [state, setState] = useState<SignalRState>({
    connection: null,
    isConnected: false,
  });

  const { addNotification } = useNotifications();

  // 1. Store the latest callback in a ref.
  // This allows us to access the latest logic without restarting the connection.
  const callbackRef = useRef(onJobUpdate);

  // 2. Update the ref whenever the parent passes a new function
  useEffect(() => {
    callbackRef.current = onJobUpdate;
  }, [onJobUpdate]);

  useEffect(() => {
    // Prevent multiple connections
    if (state.connection || state.isConnected) return;

    let isCancelled = false;

    const connect = async () => {
      // First, check if we can get a token (user is authenticated)
      const token = await fetchAccessToken();

      if (isCancelled) return;

      if (!token) {
        console.warn('[SignalR] No token available, will retry in 2s...');
        // Retry after a delay - user might still be logging in
        setTimeout(() => {
          if (!isCancelled) {
            connect();
          }
        }, 2000);
        return;
      }

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(HUB_URL, {
          accessTokenFactory: () => Promise.resolve(token)
        })
        .withAutomaticReconnect()
        .build();

      // The listener calls the Ref, not the specific function instance.
      connection.on("JobUpdate", (data: JobUpdateData) => {
        if (callbackRef.current) {
          callbackRef.current(data);
        }
      });

      connection.onreconnecting(error => {
        console.warn(`SignalR connection lost. Reconnecting... ${error}`);
        addNotification('Connection lost. Reconnecting...', 'info');
        setState(prev => ({ ...prev, isConnected: false }));
      });

      connection.onreconnected(() => {
        console.log(`SignalR reconnected.`);
        addNotification('Connection re-established.', 'success');
        setState(prev => ({ ...prev, isConnected: true }));
      });

      try {
        await connection.start();
        console.log(`[SignalR] Connected to ${HUB_URL} with auth`);
        setState({ connection, isConnected: true });
      } catch (err) {
        console.error("[SignalR] Connection error:", err);
      }
    };

    connect();

    // Cleanup
    return () => {
      isCancelled = true;
      if (state.connection) {
        state.connection.stop();
      }
    };
  }, []); 

  return state;
};