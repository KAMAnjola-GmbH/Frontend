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
    const response = await fetch('/api/auth/token', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store'
    });

    if (!response.ok) {
      return '';
    }

    const data = await response.json();
    return data.token || data.accessToken || '';
  } catch {
    return '';
  }
}

export const useSignalR = (onJobUpdate: (data: JobUpdateData) => void) => {
  const [isConnected, setIsConnected] = useState(false);
  const { addNotification } = useNotifications();

  // Refs for stable references across renders
  const callbackRef = useRef(onJobUpdate);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = onJobUpdate;
  }, [onJobUpdate]);

  useEffect(() => {
    // Prevent multiple connections
    if (connectionRef.current) return;

    let isCancelled = false;

    const connect = async () => {
      // Clear any pending retry
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }

      const token = await fetchAccessToken();

      if (isCancelled) return;

      if (!token) {
        // Retry after delay - store timeout ID for cleanup
        retryTimeoutRef.current = setTimeout(() => {
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

      connection.on("JobUpdate", (data: JobUpdateData) => {
        callbackRef.current?.(data);
      });

      connection.onreconnecting(() => {
        addNotification('Connection lost. Reconnecting...', 'info');
        setIsConnected(false);
      });

      connection.onreconnected(() => {
        addNotification('Connection re-established.', 'success');
        setIsConnected(true);
      });

      connection.onclose(() => {
        setIsConnected(false);
        connectionRef.current = null;
      });

      try {
        await connection.start();
        if (!isCancelled) {
          connectionRef.current = connection;
          setIsConnected(true);
        } else {
          // Component unmounted during connection - cleanup
          connection.stop();
        }
      } catch (err) {
        console.error("[SignalR] Connection error:", err);
      }
    };

    connect();

    // Cleanup function
    return () => {
      isCancelled = true;

      // Clear pending retry timeout
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }

      // Stop connection
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
      }
    };
  }, [addNotification]);

  return { connection: connectionRef.current, isConnected };
};