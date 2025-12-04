// src/hooks/useSusaProjects.ts
'use client';

import { useState, useEffect, useCallback,useRef } from 'react';
import { useNotifications } from './useNotifications';
import { useSignalR } from './useSignalR';
import { config } from '../app/config';
import {
  SusaProject,
  AnalysisResult,
  PreAnalysisResult,
  JobUpdateData,
  ProjectStatus
} from '../types/susa';

const SUSA_API_URL = `${config.apiProxyBaseUrl}/susa`;

// Return type of the hook
interface UseSusaProjectsReturn {
  projects: SusaProject[];
  isLoading: boolean;
  currentProjectId: number | null;
  currentProjectStatus: ProjectStatus | null;
  currentAnalysis: AnalysisResult | null;
  mappingData: PreAnalysisResult | null;
  isFetchingResults: boolean;
  selectProject: (id: number) => Promise<void>;
  uploadFile: (file: File) => Promise<boolean>;
  deleteProject: (id: number) => Promise<void>;
  renameProject: (id: number, name: string) => Promise<boolean>;
  saveMappingsAndRunAnalysis: (id: number, mappings: Record<string, string>) => Promise<boolean>;
  fetchAnalysisResults: (id: number) => Promise<boolean>;
}

export const useSusaProjects = (): UseSusaProjectsReturn => {
  const [projects, setProjects] = useState<SusaProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  const [currentProjectStatus, setCurrentProjectStatus] = useState<ProjectStatus | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [mappingData, setMappingData] = useState<PreAnalysisResult | null>(null);
  const [isFetchingResults, setIsFetchingResults] = useState(false);

  const { addNotification } = useNotifications();

  const currentProjectIdRef = useRef<number | null>(null);

  useEffect(() => {
    currentProjectIdRef.current = currentProjectId;
  }, [currentProjectId]);
  
  const processedSignalsRef = useRef<Record<number, string>>({});

  useEffect(() => {
    currentProjectIdRef.current = currentProjectId;
  }, [currentProjectId]);
  // ============================
  // API: Fetch Projects
  // ============================
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(SUSA_API_URL);

      // Handle 401 from proxy/backend separately
      if (response.status === 401) {
        const isSessionMissing = response.headers.get('X-Proxy-Auth') === 'Missing';
        if (isSessionMissing) return;
        throw new Error('Backend rejected authorization. Please check your permissions.');
      }

      if (!response.ok) throw new Error('Failed to fetch SUSA projects.');

      const data = (await response.json()) as SusaProject[];
      setProjects(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error fetching projects';
      console.error(message);
      addNotification(message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [addNotification]);

  // ============================
  // Upload File
  // ============================
  const uploadFile = useCallback(
    async (file: File): Promise<boolean> => {
      const formData = new FormData();
      formData.append('file', file);
      addNotification(`Uploading file "${file.name}"...`, 'info');

      try {
        const response = await fetch(`${SUSA_API_URL}/upload`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({ message: 'Upload failed' }));
          throw new Error(errData.message || 'Upload failed');
        }

        const result = (await response.json()) as { id: number };
        addNotification(`File "${file.name}" uploaded successfully!`, 'success');
        await fetchProjects();
        await selectProject(result.id);
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        console.error(message);
        addNotification(message, 'error');
        return false;
      }
    },
    [addNotification, fetchProjects]
  );

  // ============================
  // Fetch Analysis Results
  // ============================
  const fetchAnalysisResults = useCallback(
    async (uploadId: number): Promise<boolean> => {
      if (isFetchingResults) return false;

      setIsFetchingResults(true);
      setMappingData(null);
      addNotification('Loading analysis results...', 'info');

      try {
        const response = await fetch(`${SUSA_API_URL}/${uploadId}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mappings: {} })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({ detail: 'Failed to load results' }));
          throw new Error(errData.detail || 'Failed to load analysis results.');
        }

        const result = (await response.json()) as AnalysisResult;
        setCurrentAnalysis(result);
        addNotification('Cached analysis results loaded.', 'success');
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to load results';
        console.error(message);
        addNotification(message, 'error');
        setCurrentAnalysis(null);
        return false;
      } finally {
        setIsFetchingResults(false);
      }
    },
    [addNotification, isFetchingResults]
  );

  // ============================
  // Perform Pre-Analysis
  // ============================
  const performPreAnalysis = useCallback(
    async (uploadId: number): Promise<boolean> => {
      setCurrentAnalysis(null);
      setMappingData(null);
      addNotification('Initiating pre-analysis...', 'info');

      try {
        const response = await fetch(`${SUSA_API_URL}/${uploadId}/pre-analyze`, { method: 'POST' });
        if (!response.ok) {
          const errData = await response.json().catch(() => ({ message: 'Pre-analysis failed' }));
          throw new Error(errData.message);
        }

        const result = (await response.json()) as PreAnalysisResult;
        setMappingData(result);
        addNotification('Pre-analysis complete. Ready for mapping.', 'success');
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Pre-analysis failed';
        console.error(message);
        addNotification(`Error: ${message}`, 'error');
        fetchProjects();
        return false;
      }
    },
    [addNotification, fetchProjects]
  );

  // ============================
  // Save Mappings and Run Analysis
  // ============================
  const saveMappingsAndRunAnalysis = useCallback(
    async (uploadId: number, mappings: Record<string, string>): Promise<boolean> => {
      setMappingData(null);
      addNotification('Queuing analysis job...', 'info');

      try {
        const response = await fetch(`${SUSA_API_URL}/${uploadId}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mappings })
        });

        if (response.status !== 202) {
          const errData = await response.json().catch(() => ({ detail: 'Failed to queue job' }));
          throw new Error(errData.detail || 'Failed to queue job');
        }

        const result = (await response.json()) as { jobId: number; status: ProjectStatus };
        addNotification(`Job ${result.jobId} queued! Status: ${result.status}.`, 'success');
        fetchProjects();
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to queue job';
        console.error(message);
        addNotification(message, 'error');
        fetchProjects();
        return false;
      }
    },
    [addNotification, fetchProjects]
  );

  // ============================
  // Delete Project
  // ============================
  const deleteProject = useCallback(
    async (uploadId: number): Promise<void> => {
      try {
        const response = await fetch(`${SUSA_API_URL}/${uploadId}`, { method: 'DELETE' });
        if (response.status !== 204) {
          const errData = await response.json().catch(() => ({ message: 'Delete failed' }));
          throw new Error(errData.message || 'Delete failed');
        }
        addNotification('Project deleted successfully.', 'success');
        await fetchProjects();

        if (currentProjectId === uploadId) {
          setCurrentProjectId(null);
          setCurrentAnalysis(null);
          setMappingData(null);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to delete project';
        console.error(message);
        addNotification(message, 'error');
      }
    },
    [addNotification, fetchProjects, currentProjectId]
  );

  // ============================
  // Rename Project
  // ============================
  const renameProject = useCallback(
    async (uploadId: number, newName: string): Promise<boolean> => {
      try {
        const response = await fetch(`${SUSA_API_URL}/${uploadId}/rename`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newName })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({ message: 'Rename failed' }));
          throw new Error(errData.message || 'Rename failed');
        }

        addNotification('Project renamed successfully.', 'success');
        await fetchProjects();
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to rename project';
        console.error(message);
        addNotification(message, 'error');
        return false;
      }
    },
    [addNotification, fetchProjects]
  );

  // ============================
  // Select Project
  // ============================
  const selectProject = useCallback(
    async (projectId: number): Promise<void> => {
      setCurrentProjectId(projectId);
      setCurrentAnalysis(null);
      setMappingData(null);

      const project = projects.find((p) => p.id === projectId);
      if (!project) {
        await fetchProjects();
        return;
      }

      setCurrentProjectStatus(project.status);

      if (project.status === 'Ready for Mapping' || project.status === 'Mapping in Progress') {
        await performPreAnalysis(projectId);
      } else if (project.status === 'Completed') {
        await fetchAnalysisResults(projectId);
      } else {
        addNotification(`Project ${projectId} is currently ${project.status}. Please wait.`, 'info');
      }
    },
    [projects, fetchProjects, performPreAnalysis, fetchAnalysisResults, addNotification]
  );

// ============================
  // Handle SignalR Updates (With Idempotency Fix)
  // ============================
  const handleJobUpdate = useCallback(
    (data: JobUpdateData) => {
      
      // NORMALIZE STATUS
      let incomingStatus = data.status;
      if (incomingStatus === 'Completed') {
        incomingStatus = 'Completed';
      }

      // === THE FIX: DUPLICATE CHECK ===
      // Check if we have already processed this specific status for this job.
      const lastStatus = processedSignalsRef.current[data.jobId];

      if (lastStatus === incomingStatus) {
        console.log(`SignalR Duplicate Ignored: ID ${data.jobId} is already "${incomingStatus}"`);
        return; // STOP EXECUTION HERE
      }

      // Mark this status as processed
      processedSignalsRef.current[data.jobId] = incomingStatus;
      // ================================

      // Refresh list (Only do this once per valid status change)
      fetchProjects();

      const activeId = currentProjectIdRef.current;

      if (data.jobId === activeId) {
        setCurrentProjectStatus(incomingStatus);

        console.log(`SignalR Update: ID ${data.jobId}, Status: "${incomingStatus}"`);

        if (incomingStatus === 'Completed') {
          addNotification(`Analysis for project ${data.jobId} completed! Loading results...`, 'success');
          fetchAnalysisResults(data.jobId);
        } 
        else if (typeof incomingStatus === 'string' && incomingStatus.startsWith('Failed')) {
          addNotification(`Analysis for project ${data.jobId} failed.`, 'error');
        } 
        else if (incomingStatus === 'Processing') {
          addNotification(`Project ${data.jobId} analysis is now running.`, 'info');
        }
      }
    },
    [fetchProjects, fetchAnalysisResults, addNotification]
  );

  useSignalR(handleJobUpdate);

  // ============================
  // Initial Fetch
  // ============================
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    currentProjectId,
    currentProjectStatus,
    currentAnalysis,
    mappingData,
    isFetchingResults,
    selectProject,
    uploadFile,
    deleteProject,
    renameProject,
    saveMappingsAndRunAnalysis,
    fetchAnalysisResults
  };
};
