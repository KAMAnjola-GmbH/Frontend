'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';

// Use the public environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type JobUpdateData = { jobId: number; status: string; error?: string };

interface SignalRContextType {
  connection: signalR.HubConnection | null;
  connectionStatus: 'Disconnected' | 'Connecting' | 'Connected' | 'Error';
  lastJobUpdate: JobUpdateData | null;
  // Function to register a temporary listener from a component
  registerJobUpdateListener: (callback: (data: JobUpdateData) => void) => () => void;
}

const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

export function SignalRProvider({ token, children }: { token: string | undefined, children: ReactNode }) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<SignalRContextType['connectionStatus']>('Disconnected');
  const [lastJobUpdate, setLastJobUpdate] = useState<JobUpdateData | null>(null);

  // Central storage for job update callbacks
  const jobUpdateCallbacks = React.useRef<((data: JobUpdateData) => void)[]>([]);
  
  // Register/Deregister logic for components to use
  const registerJobUpdateListener = useCallback((callback: (data: JobUpdateData) => void) => {
    jobUpdateCallbacks.current.push(callback);
    return () => {
      jobUpdateCallbacks.current = jobUpdateCallbacks.current.filter(cb => cb !== callback);
    };
  }, []);


  useEffect(() => {
    if (!token || !API_BASE_URL) return;

    setConnectionStatus('Connecting');
    const hubUrl = `${API_BASE_URL}/jobHub`; 

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => token! })
      .withAutomaticReconnect()
      .build();
    
    // Add event handlers
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
        // 1. Update global state for general consumption
        setLastJobUpdate(data);
        
        // 2. Notify specific components listening via the ref
        jobUpdateCallbacks.current.forEach(callback => callback(data));
    });

    return () => {
      // Cleanup previous connection if token changes or component unmounts
      newConnection.stop().then(() => console.log('SignalR disconnected.'));
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