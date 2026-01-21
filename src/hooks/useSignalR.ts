// src/hooks/useSignalR.ts
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import { JobUpdateData } from '../types/susa';

const SIGNALR_BASE_URL = process.env.NEXT_PUBLIC_SIGNALR_URL;
const HUB_URL = SIGNALR_BASE_URL
  ? `${SIGNALR_BASE_URL}/simulationHub`
  : 'http://localhost:5256/simulationHub';

/** Initial retry delay in ms */
const INITIAL_RETRY_DELAY = 2000;
/** Maximum retry delay in ms (30 seconds) */
const MAX_RETRY_DELAY = 30000;
/** Maximum number of token fetch retries before giving up */
const MAX_TOKEN_RETRIES = 10;

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
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[SignalR] Failed to fetch access token:', error);
    }
    return '';
  }
}

/**
 * Connection status change callback type.
 */
type ConnectionStatusCallback = (status: 'connecting' | 'connected' | 'reconnecting' | 'disconnected') => void;

export const useSignalR = (
  onJobUpdate: (data: JobUpdateData) => void,
  onConnectionStatusChange?: ConnectionStatusCallback
) => {
  const [isConnected, setIsConnected] = useState(false);

  // Refs for stable references across renders
  const callbackRef = useRef(onJobUpdate);
  const statusCallbackRef = useRef(onConnectionStatusChange);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);

  // Update callback refs when they change
  useEffect(() => {
    callbackRef.current = onJobUpdate;
  }, [onJobUpdate]);

  useEffect(() => {
    statusCallbackRef.current = onConnectionStatusChange;
  }, [onConnectionStatusChange]);

  // Notify status change helper
  const notifyStatus = useCallback((status: 'connecting' | 'connected' | 'reconnecting' | 'disconnected') => {
    statusCallbackRef.current?.(status);
  }, []);

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

      notifyStatus('connecting');
      const token = await fetchAccessToken();

      if (isCancelled) return;

      if (!token) {
        // Check if we've exceeded max retries
        if (retryCountRef.current >= MAX_TOKEN_RETRIES) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('[SignalR] Max token fetch retries exceeded, stopping reconnection attempts');
          }
          notifyStatus('disconnected');
          return;
        }

        // Exponential backoff for retry
        const delay = Math.min(
          INITIAL_RETRY_DELAY * Math.pow(2, retryCountRef.current),
          MAX_RETRY_DELAY
        );
        retryCountRef.current++;

        retryTimeoutRef.current = setTimeout(() => {
          if (!isCancelled) {
            connect();
          }
        }, delay);
        return;
      }

      // Reset retry count on successful token fetch
      retryCountRef.current = 0;

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(HUB_URL, {
          accessTokenFactory: () => Promise.resolve(token)
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000]) // Progressive retry delays
        .build();

      connection.on("JobUpdate", (data: JobUpdateData) => {
        callbackRef.current?.(data);
      });

      connection.onreconnecting(() => {
        notifyStatus('reconnecting');
        setIsConnected(false);
      });

      connection.onreconnected(() => {
        notifyStatus('connected');
        setIsConnected(true);
      });

      connection.onclose(() => {
        notifyStatus('disconnected');
        setIsConnected(false);
        connectionRef.current = null;
      });

      try {
        await connection.start();
        if (!isCancelled) {
          connectionRef.current = connection;
          setIsConnected(true);
          notifyStatus('connected');
        } else {
          // Component unmounted during connection - cleanup
          connection.stop();
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error("[SignalR] Connection error:", err);
        }
        notifyStatus('disconnected');
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
  }, [notifyStatus]); // notifyStatus is stable via useCallback with empty deps

  return { isConnected };
};