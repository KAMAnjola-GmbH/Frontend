'use client';

import { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { useProjects } from '@/app/context/ProjectContext';

export const SignalRProvider = ({ children }: { children: React.ReactNode }) => {
  const { fetchProjects } = useProjects();

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`localhost:51237/simulationHub`) // Point to your .NET hub
      .withAutomaticReconnect()
      .build();

    // This replaces _setupSignalRListener
    hubConnection.on('JobUpdate', (data: { jobId: number; status: string }) => {
      console.log('SIGNALR RECEIVED JobUpdate:', data);
      
      // 1. Refresh the project list to show the new status
      fetchProjects();

      // 2. TODO: If the updated job is the one currently being viewed,
      //    you'll need another context/state to trigger a refresh
      //    of the project/[id]/page.tsx component.
    });

    hubConnection
      .start()
      .then(() => console.log('SignalR Connected.'))
      .catch((err) => console.error('SignalR Connection Error: ', err));

    // Clean up on unmount
    return () => {
      hubConnection.stop();
    };
  }, [fetchProjects]); // Re-run if fetchProjects changes (it shouldn't, due to useCallback)

  return <>{children}</>;
};