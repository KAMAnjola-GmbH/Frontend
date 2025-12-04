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

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .build();

    // 3. The listener calls the Ref, not the specific function instance.
    // This wrapper is STABLE. It never changes.
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

    const start = async () => {
      try {
        await connection.start();
        console.log(`SignalR Connected to ${HUB_URL}`);
        setState({ connection, isConnected: true });
      } catch (err) {
        console.error("SignalR connection error:", err);
        // Basic retry logic could go here, 
        // but automaticReconnect handles most temp failures after start
      }
    };

    start();

    // Cleanup
    return () => {
      connection.stop();
    };
    // 4. Dependency array is EMPTY (or essentially empty). 
    // The connection is born once and dies only on unmount.
  }, []); 

  return state;
};