// src/hooks/useSusaProjects.ts
import { useState, useEffect, useCallback } from 'react';
import { useNotifications } from './useNotifications';
import { useSignalR } from './useSignalR';
import { config } from '../app/config';
import { SusaProject, AnalysisResult, PreAnalysisResult, JobUpdateData, ProjectStatus } from '../types/susa';

// Assuming SUSA API base is defined in config
const SUSA_API_URL = `${config.apiProxyBaseUrl}/susa`;

export const useSusaProjects = () => {
    const [projects, setProjects] = useState<SusaProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
    const [currentProjectStatus, setCurrentProjectStatus] = useState<ProjectStatus | null>(null);
    const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
    const [mappingData, setMappingData] = useState<PreAnalysisResult | null>(null);
    const [isFetchingResults, setIsFetchingResults] = useState(false);
    
    const { addNotification } = useNotifications();

    // === API CALLS ===

    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(SUSA_API_URL); 
            
            // === LOOP PREVENTION LOGIC ===
            if (response.status === 401) {
                // Check if the 401 came from the Proxy (Session Missing) or Backend (Token Invalid)
                // The proxy injects 'X-Proxy-Auth: Missing' if the Next.js session is gone.
                const isSessionMissing = response.headers.get('X-Proxy-Auth') === 'Missing';

                if (isSessionMissing) {
                    // Session is truly missing: Redirect to Login
                   // const returnTo = window.location.pathname + window.location.search;
                  //  window.location.href = `/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
                    return;
                } else {
                    // Session exists, but Backend rejected the token (e.g. permissions/audience issue).
                    // DO NOT REDIRECT. Show error to user to stop the loop.
                    throw new Error('Backend rejected authorization. Please check your account permissions.');
                }
            }

            if (!response.ok) throw new Error('Failed to fetch SUSA projects.');
            const data: SusaProject[] = await response.json();
            setProjects(data);
        } catch (error: any) {
            console.error('Error fetching SUSA projects:', error);
            addNotification(error.message || 'Could not load SUSA project list.', 'error');
        } finally {
            setIsLoading(false);
        }
    }, [addNotification]);

    // Replaces upload()
    const uploadFile = useCallback(async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        addNotification(`Uploading file "${file.name}"...`, 'info');

        try {
            const response = await fetch(`${SUSA_API_URL}/upload`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({ message: "Upload failed" }));
                throw new Error(err.message || "Upload failed");
            }
            const result: { id: number } = await response.json();

            addNotification(`File "${file.name}" uploaded successfully!`, 'success');
            await fetchProjects();
            selectProject(result.id);
            
            return true;
        } catch (err: any) {
            console.error(err);
            addNotification(err.message || "Upload failed", 'error');
            return false;
        }
    }, [addNotification, fetchProjects]);

    // Replaces fetchAndDisplayAnalysisResults()
    const fetchAnalysisResults = useCallback(async (uploadId: number) => {
        if (isFetchingResults) return;

        addNotification('Loading analysis results...', 'info');
        setIsFetchingResults(true);
        setMappingData(null); // Clear mapping UI

        try {
            const response = await fetch(`${SUSA_API_URL}/${uploadId}/analyze`, {
                method: 'POST', // POST to signal fetching cache
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mappings: {} }) // Empty mappings to fetch cached result
            });

            if (response.status !== 200) {
                const err = await response.json().catch(() => ({ message: "Failed to load results" }));
                throw new Error(err.detail || 'Failed to load analysis results.');
            }

            const result: AnalysisResult = await response.json();
            setCurrentAnalysis(result);
            addNotification('Cached analysis results loaded.', 'success');
            return true;

        } catch (err: any) {
            console.error(err);
            addNotification(err.message || 'Failed to load analysis results.', 'error');
            setCurrentAnalysis(null);
            return false;
        } finally {
            setIsFetchingResults(false);
        }
    }, [addNotification, isFetchingResults]);

    // Replaces performPreAnalysis()
    const performPreAnalysis = useCallback(async (uploadId: number) => {
        addNotification("Initiating pre-analysis...", "info");
        setMappingData(null); 
        setCurrentAnalysis(null);

        try {
            const response = await fetch(`${SUSA_API_URL}/${uploadId}/pre-analyze`, {
                method: 'POST',
            });
            
            if (!response.ok) {
                const errorJson = await response.json().catch(() => ({ message: "Pre-analysis failed." }));
                throw new Error(errorJson.message || 'Pre-analysis failed.');
            }

            const preAnalysisResult: PreAnalysisResult = await response.json();
            setMappingData(preAnalysisResult);
            addNotification("Pre-analysis complete. Ready for mapping.", "success");
            return true;
        } catch (error: any) {
            console.error("Error during pre-analysis:", error);
            addNotification(`Error: ${error.message}`, "error");
            fetchProjects();
            return false;
        }
    }, [addNotification, fetchProjects]);
    
    // Replaces saveMappingsAndRunAnalysis()
    const saveMappingsAndRunAnalysis = useCallback(async (uploadId: number, mappings: { [account: string]: string }) => {
        addNotification('Queuing analysis job...', 'info');
        setMappingData(null); // Clear mapping UI

        try {
            const response = await fetch(`${SUSA_API_URL}/${uploadId}/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mappings }),
            });

            if (response.status !== 202) { // Expect 202 Accepted
                const errorData = await response.json().catch(() => ({ message: "Failed to queue job" }));
                throw new Error(errorData.detail || 'Failed to queue job.');
            }

            const queueResult: { jobId: number, status: ProjectStatus } = await response.json();
            addNotification(`Job ${queueResult.jobId} successfully queued! Status: ${queueResult.status}.`, 'success');

            fetchProjects(); // Refresh list to update status
            return true;

        } catch (err: any) {
            console.error("Error queuing analysis:", err);
            addNotification(err.message || 'Failed to queue analysis.', 'error');
            fetchProjects(); 
            return false;
        }
    }, [addNotification, fetchProjects]);


    // Replaces deleteUpload()
    const deleteProject = useCallback(async (uploadId: number) => {
        try {
            const response = await fetch(`${SUSA_API_URL}/${uploadId}`, {
                method: 'DELETE',
            });
            if (response.status !== 204) {
                const err = await response.json().catch(() => ({ message: "Delete failed" }));
                throw new Error(err.message || 'Delete failed.');
            }
            addNotification('Project deleted successfully.', 'success');
            await fetchProjects();
            // Clear current view if the deleted project was active
            if (currentProjectId === uploadId) {
                setCurrentProjectId(null);
                setCurrentAnalysis(null);
                setMappingData(null);
            }
        } catch (err: any) {
            console.error(err);
            addNotification(err.message || 'Failed to delete project.', 'error');
        }
    }, [addNotification, fetchProjects, currentProjectId]);

    // Replaces renameUpload()
    const renameProject = useCallback(async (uploadId: number, newName: string) => {
        try {
            const response = await fetch(`${SUSA_API_URL}/${uploadId}/rename`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newName }),
            });
            if (!response.ok) {
                const err = await response.json().catch(() => ({ message: "Rename failed" }));
                throw new Error(err.message || 'Rename failed.');
            }
            addNotification('Project renamed successfully.', 'success');
            await fetchProjects();
            return true;
        } catch (err: any) {
            console.error(err);
            addNotification(err.message || 'Failed to rename project.', 'error');
            return false;
        }
    }, [addNotification, fetchProjects]);


    // Replaces selectProject()
    const selectProject = useCallback(async (projectId: number) => {
        setCurrentProjectId(projectId);
        setMappingData(null);
        setCurrentAnalysis(null);
        
        // Find the project locally to determine status
        const project = projects.find(p => p.id === projectId);
        if (!project) {
            // If project not found locally, fetch it first
            await fetchProjects();
            return;
        }
        
        setCurrentProjectStatus(project.status);

        if (project.status === 'Ready for Mapping' || project.status === 'Mapping in Progress') {
            await performPreAnalysis(projectId);
        } else if (project.status === 'Analysis Complete') {
            await fetchAnalysisResults(projectId);
        } else {
            addNotification(`Project ${projectId} is currently in status: ${project.status}. Please wait.`, 'info');
        }
    }, [projects, fetchProjects, performPreAnalysis, fetchAnalysisResults, addNotification]);


    // === SIGNALR HANDLING ===
    const handleJobUpdate = useCallback((data: JobUpdateData) => {
        console.log("SIGNALR RECEIVED JobUpdate:", data);
        
        // 1. Refresh the project list immediately to update status badges
        fetchProjects();

        // 2. If the updated job is the one currently displayed, update UI
        if (data.jobId === currentProjectId) {
            setCurrentProjectStatus(data.status);

            if (data.status === 'Analysis Complete') {
                addNotification(`Analysis for project ${data.jobId} completed! Loading results...`, 'success');
                // Automatically fetch and display final results
                fetchAnalysisResults(data.jobId); 
            } else if (data.status.startsWith('Failed')) {
                addNotification(`Analysis for project ${data.jobId} failed.`, 'error');
            } else if (data.status === 'Processing') {
                addNotification(`Project ${data.jobId} analysis is now running.`, 'info');
            }
        }
    }, [fetchProjects, currentProjectId, fetchAnalysisResults, addNotification]);

    // Integrate SignalR
    useSignalR(handleJobUpdate);

    // Initial fetch
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
        fetchAnalysisResults, // Expose for context menu analysis button
    };
};