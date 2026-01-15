/**
 * SUSA Projects Hook.
 * Manages state and operations for SUSA financial analysis projects.
 */
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNotifications } from './useNotifications';
import { useSignalR } from './useSignalR';
import { susaApi, ApiError } from '@/services/api';
import type {
  SusaProject,
  AnalysisResult,
  PreAnalysisResult,
  JobUpdateData,
  ProjectStatus,
} from '@/types/susa';

/**
 * Return type of useSusaProjects hook.
 */
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

/**
 * Extract error message from various error types.
 */
function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    // Try to get message from API response
    const data = error.data as { message?: string; detail?: string; error?: string } | null;
    return data?.message || data?.detail || data?.error || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

export const useSusaProjects = (): UseSusaProjectsReturn => {
  // State
  const [projects, setProjects] = useState<SusaProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  const [currentProjectStatus, setCurrentProjectStatus] = useState<ProjectStatus | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [mappingData, setMappingData] = useState<PreAnalysisResult | null>(null);
  const [isFetchingResults, setIsFetchingResults] = useState(false);

  // Hooks
  const { addNotification } = useNotifications();

  // Refs for SignalR callback and race condition prevention
  const currentProjectIdRef = useRef<number | null>(null);
  const processedSignalsRef = useRef<Record<number, string>>({});
  const requestIdRef = useRef(0); // Incremented for each async operation

  // Keep ref in sync with state
  useEffect(() => {
    currentProjectIdRef.current = currentProjectId;
  }, [currentProjectId]);

  // ============================
  // API: Fetch Projects
  // ============================
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await susaApi.getProjects();
      setProjects(data);
    } catch (error) {
      // Handle 401 silently (user not logged in yet)
      if (error instanceof ApiError && error.isUnauthorized()) {
        return;
      }
      const message = getErrorMessage(error, 'Failed to fetch projects');
      console.error('[useSusaProjects] fetchProjects:', message);
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
      addNotification(`Uploading file "${file.name}"...`, 'info');

      try {
        const result = await susaApi.uploadFile(file);
        addNotification(`File "${file.name}" uploaded successfully!`, 'success');
        await fetchProjects();
        await selectProject(result.id);
        return true;
      } catch (error) {
        const message = getErrorMessage(error, 'Upload failed');
        console.error('[useSusaProjects] uploadFile:', message);
        addNotification(message, 'error');
        return false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- selectProject is defined later but stable
    [addNotification, fetchProjects]
  );

  // ============================
  // Fetch Analysis Results
  // ============================
  const fetchAnalysisResults = useCallback(
    async (uploadId: number): Promise<boolean> => {
      // Generate unique request ID for race condition prevention
      const thisRequestId = ++requestIdRef.current;

      setIsFetchingResults(true);
      setMappingData(null);
      addNotification('Loading analysis results...', 'info');

      try {
        const result = await susaApi.analyze(uploadId, {});

        // Check if this request is still the latest one
        if (thisRequestId !== requestIdRef.current) {
          return false; // A newer request superseded this one
        }

        // Check if it's a completed analysis (has kpiResults)
        if ('kpiResults' in result) {
          setCurrentAnalysis(result as AnalysisResult);
          addNotification('Analysis results loaded.', 'success');
          return true;
        }

        addNotification('Analysis not yet complete.', 'info');
        return false;
      } catch (error) {
        // Only show error if this is still the active request
        if (thisRequestId === requestIdRef.current) {
          const message = getErrorMessage(error, 'Failed to load results');
          console.error('[useSusaProjects] fetchAnalysisResults:', message);
          addNotification(message, 'error');
          setCurrentAnalysis(null);
        }
        return false;
      } finally {
        // Only update loading state if this is still the active request
        if (thisRequestId === requestIdRef.current) {
          setIsFetchingResults(false);
        }
      }
    },
    [addNotification]
  );

  // ============================
  // Perform Pre-Analysis
  // ============================
  const performPreAnalysis = useCallback(
    async (uploadId: number): Promise<boolean> => {
      // Generate unique request ID for race condition prevention
      const thisRequestId = ++requestIdRef.current;

      setCurrentAnalysis(null);
      setMappingData(null);
      addNotification('Initiating pre-analysis...', 'info');

      try {
        const result = await susaApi.preAnalyze(uploadId);

        // Check if this request is still the latest one
        if (thisRequestId !== requestIdRef.current) {
          return false;
        }

        setMappingData(result);
        addNotification('Pre-analysis complete. Ready for mapping.', 'success');
        return true;
      } catch (error) {
        if (thisRequestId === requestIdRef.current) {
          const message = getErrorMessage(error, 'Pre-analysis failed');
          console.error('[useSusaProjects] performPreAnalysis:', message);
          addNotification(`Error: ${message}`, 'error');
          fetchProjects();
        }
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
        const result = await susaApi.analyze(uploadId, mappings);

        // Check if job was queued (has jobId) or returned cached result
        if ('jobId' in result) {
          addNotification(`Job ${result.jobId} queued! Status: ${result.status}.`, 'success');
        } else {
          // Cached result returned immediately
          setCurrentAnalysis(result as AnalysisResult);
          addNotification('Analysis complete!', 'success');
        }

        fetchProjects();
        return true;
      } catch (error) {
        const message = getErrorMessage(error, 'Failed to queue job');
        console.error('[useSusaProjects] saveMappingsAndRunAnalysis:', message);
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
        await susaApi.deleteProject(uploadId);
        addNotification('Project deleted successfully.', 'success');
        await fetchProjects();

        if (currentProjectId === uploadId) {
          setCurrentProjectId(null);
          setCurrentAnalysis(null);
          setMappingData(null);
          setCurrentProjectStatus(null);
        }
      } catch (error) {
        const message = getErrorMessage(error, 'Failed to delete project');
        console.error('[useSusaProjects] deleteProject:', message);
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
        await susaApi.renameProject(uploadId, newName);
        addNotification('Project renamed successfully.', 'success');
        await fetchProjects();
        return true;
      } catch (error) {
        const message = getErrorMessage(error, 'Failed to rename project');
        console.error('[useSusaProjects] renameProject:', message);
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
      // Increment request ID - this will invalidate any pending requests
      const thisRequestId = ++requestIdRef.current;

      setCurrentProjectId(projectId);
      setCurrentAnalysis(null);
      setMappingData(null);

      const project = projects.find((p) => p.id === projectId);
      if (!project) {
        await fetchProjects();
        return;
      }

      setCurrentProjectStatus(project.status);

      // Note: performPreAnalysis and fetchAnalysisResults already use requestIdRef
      // so they will automatically check if they're still the active request
      if (project.status === 'Ready for Mapping' || project.status === 'Mapping in Progress') {
        await performPreAnalysis(projectId);
      } else if (project.status === 'Completed') {
        await fetchAnalysisResults(projectId);
      } else {
        // Only show notification if this is still the active request
        if (thisRequestId === requestIdRef.current) {
          addNotification(`Project ${projectId} is currently ${project.status}. Please wait.`, 'info');
        }
      }
    },
    [projects, fetchProjects, performPreAnalysis, fetchAnalysisResults, addNotification]
  );

  // ============================
  // Handle SignalR Updates
  // ============================
  const handleJobUpdate = useCallback(
    (data: JobUpdateData) => {
      const incomingStatus = data.status;

      // Idempotency check - prevent duplicate processing
      const lastStatus = processedSignalsRef.current[data.jobId];
      if (lastStatus === incomingStatus) {
        console.log(`[SignalR] Duplicate ignored: Job ${data.jobId} already "${incomingStatus}"`);
        return;
      }

      // Mark status as processed
      processedSignalsRef.current[data.jobId] = incomingStatus;

      // Refresh project list
      fetchProjects();

      const activeId = currentProjectIdRef.current;

      if (data.jobId === activeId) {
        setCurrentProjectStatus(incomingStatus);
        console.log(`[SignalR] Update: Job ${data.jobId}, Status: "${incomingStatus}"`);

        if (incomingStatus === 'Completed') {
          addNotification(`Analysis for project ${data.jobId} completed! Loading results...`, 'success');
          fetchAnalysisResults(data.jobId);
        } else if (typeof incomingStatus === 'string' && incomingStatus.startsWith('Failed')) {
          addNotification(`Analysis for project ${data.jobId} failed.`, 'error');
        } else if (incomingStatus === 'Processing') {
          addNotification(`Project ${data.jobId} analysis is now running.`, 'info');
        }
      }
    },
    [fetchProjects, fetchAnalysisResults, addNotification]
  );

  // Register SignalR listener
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
    fetchAnalysisResults,
  };
};
