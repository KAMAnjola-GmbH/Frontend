'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

// Use the public environment variable for the direct WebSocket connection
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// NEW: Use a dedicated environment variable for the SignalR host (e.g., http://localhost:51237)
const SIGNALR_BASE_URL = process.env.NEXT_PUBLIC_SIGNALR_URL; 

// --- Types ---
type JobUpdateData = { jobId: number; status: string; error?: string };

interface SignalRContextType {
  connection: signalR.HubConnection | null;
  connectionStatus: 'Disconnected' | 'Connecting' | 'Connected' | 'Error';
  lastJobUpdate: JobUpdateData | null;
  // Function for components to subscribe to real-time updates
  registerJobUpdateListener: (callback: (data: JobUpdateData) => void) => () => void;
}

const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

export function SignalRProvider({ token, children }: { token: string | undefined, children: ReactNode }) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<SignalRContextType['connectionStatus']>('Disconnected');
  const [lastJobUpdate, setLastJobUpdate] = useState<JobUpdateData | null>(null);

  // Use a ref to hold all subscription callbacks without triggering component re-renders
  const jobUpdateCallbacks = useRef<((data: JobUpdateData) => void)[]>([]);
  
  // Expose a function for other components to subscribe
  const registerJobUpdateListener = useCallback((callback: (data: JobUpdateData) => void) => {
    jobUpdateCallbacks.current.push(callback);
    return () => {
      jobUpdateCallbacks.current = jobUpdateCallbacks.current.filter(cb => cb !== callback);
    };
  }, []);

  useEffect(() => {
    // Check for token and the NEW dedicated SignalR base URL
    if (!token || !SIGNALR_BASE_URL) {
        setConnectionStatus('Disconnected');
        console.error("SignalR Configuration Missing: NEXT_PUBLIC_SIGNALR_URL is not set.");
        return;
    }

    setConnectionStatus('Connecting');
    
    // CRITICAL FIX: Use the dedicated URL and the path observed in the error
    // If the path is /simulationHub, use that. If the intended path is /jobHub, use that.
    // Given the error message, I will use /simulationHub as it appeared in the output, 
    // even though /jobHub was used previously. You may need to change this path back.
    const hubUrl = `${SIGNALR_BASE_URL}/simulationHub`; 

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => token! })
      .withAutomaticReconnect()
      .build();
    
    // Setup connection event handlers
    newConnection.onclose(() => setConnectionStatus('Disconnected'));
    newConnection.onreconnecting(() => setConnectionStatus('Connecting'));
    newConnection.onreconnected(() => setConnectionStatus('Connected'));

    newConnection.start()
      .then(() => {
        setConnectionStatus('Connected');
        setConnection(newConnection);
      })
      .catch(err => {
        console.error('SignalR Connection Error: ', err);
        setConnectionStatus('Error');
      });

    // Central JobUpdate listener
    newConnection.on("JobUpdate", (data: JobUpdateData) => {
        setLastJobUpdate(data);
        // Dispatch to all listening components
        jobUpdateCallbacks.current.forEach(callback => callback(data));
    });

    return () => {
      // Cleanup previous connection
      newConnection.stop().then(() => setConnection(null));
    };
  }, [token]);


  const value = {
    connection,
    connectionStatus,
    lastJobUpdate,
    registerJobUpdateListener
  };

  return <SignalRContext.Provider value={value}>{children}</SignalRContext.Provider>;
}

export function useSignalRContext() {
  const context = useContext(SignalRContext);
  if (context === undefined) {
    throw new Error('useSignalRContext must be used within a SignalRProvider');
  }
  return context;
}