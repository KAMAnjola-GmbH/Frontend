/**
 * 3D Viewer Projects Hook.
 * Manages state and operations for 3D model viewing projects.
 */
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNotifications } from './useNotifications';
import { projectsApi, ApiError } from '@/services/api';
import type {
    ViewerProject,
    StressSimulationResult,
} from '@/types/viewer';

/**
 * Return type of useViewerProjects hook.
 */
interface UseViewerProjectsReturn {
    projects: ViewerProject[];
    isLoading: boolean;
    currentProjectId: number | null;
    currentProject: ViewerProject | null;
    modelBlobUrl: string | null;
    isLoadingModel: boolean;
    isSimulating: boolean;
    stressResult: StressSimulationResult | null;
    selectProject: (id: number) => Promise<void>;
    uploadFile: (file: File) => Promise<boolean>;
    deleteProject: (id: number) => Promise<void>;
    renameProject: (id: number, name: string) => Promise<boolean>;
    runStressSimulation: (id: number) => Promise<void>;
    resetCamera: () => void;
    cameraResetTrigger: number;
}

/**
 * Extract error message from various error types.
 */
function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof ApiError) {
        const data = error.data as { message?: string; detail?: string; error?: string } | null;
        return data?.message || data?.detail || data?.error || error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return fallback;
}

export const useViewerProjects = (): UseViewerProjectsReturn => {
    // State
    const [projects, setProjects] = useState<ViewerProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
    const [modelBlobUrl, setModelBlobUrl] = useState<string | null>(null);
    const [isLoadingModel, setIsLoadingModel] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const [stressResult, setStressResult] = useState<StressSimulationResult | null>(null);
    const [cameraResetTrigger, setCameraResetTrigger] = useState(0);

    // Hooks
    const { addNotification } = useNotifications();

    // Ref for cleanup
    const currentBlobUrlRef = useRef<string | null>(null);

    // Cleanup blob URL on unmount or when model changes
    useEffect(() => {
        return () => {
            if (currentBlobUrlRef.current) {
                URL.revokeObjectURL(currentBlobUrlRef.current);
            }
        };
    }, []);

    // Derived state
    const currentProject = projects.find((p) => p.id === currentProjectId) || null;

    // ============================
    // API: Fetch Projects
    // ============================
    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await projectsApi.getProjects();
            setProjects(data);
        } catch (error) {
            if (error instanceof ApiError && error.isUnauthorized()) {
                return;
            }
            const message = getErrorMessage(error, 'Failed to fetch projects');
            console.error('[useViewerProjects] fetchProjects:', message);
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
            addNotification(`Uploading "${file.name}"...`, 'info');

            try {
                const result = await projectsApi.uploadFile(file);
                addNotification(`"${file.name}" uploaded successfully!`, 'success');
                await fetchProjects();
                await selectProject(result.id);
                return true;
            } catch (error) {
                const message = getErrorMessage(error, 'Upload failed');
                console.error('[useViewerProjects] uploadFile:', message);
                addNotification(message, 'error');
                return false;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [addNotification, fetchProjects]
    );

    // ============================
    // Load Model
    // ============================
    const loadModel = useCallback(
        async (projectId: number): Promise<void> => {
            setIsLoadingModel(true);
            setStressResult(null);

            // Cleanup previous blob URL
            if (currentBlobUrlRef.current) {
                URL.revokeObjectURL(currentBlobUrlRef.current);
                currentBlobUrlRef.current = null;
                setModelBlobUrl(null);
            }

            try {
                const blob = await projectsApi.downloadModel(projectId);
                const blobUrl = URL.createObjectURL(blob);
                currentBlobUrlRef.current = blobUrl;
                setModelBlobUrl(blobUrl);
            } catch (error) {
                const message = getErrorMessage(error, 'Failed to load model');
                console.error('[useViewerProjects] loadModel:', message);
                addNotification(message, 'error');
            } finally {
                setIsLoadingModel(false);
            }
        },
        [addNotification]
    );

    // ============================
    // Select Project
    // ============================
    const selectProject = useCallback(
        async (projectId: number): Promise<void> => {
            setCurrentProjectId(projectId);

            const project = projects.find((p) => p.id === projectId);
            if (!project) {
                await fetchProjects();
            }

            await loadModel(projectId);
        },
        [projects, fetchProjects, loadModel]
    );

    // ============================
    // Delete Project
    // ============================
    const deleteProject = useCallback(
        async (projectId: number): Promise<void> => {
            try {
                await projectsApi.deleteProject(projectId);
                addNotification('Project deleted successfully.', 'success');
                await fetchProjects();

                if (currentProjectId === projectId) {
                    setCurrentProjectId(null);
                    if (currentBlobUrlRef.current) {
                        URL.revokeObjectURL(currentBlobUrlRef.current);
                        currentBlobUrlRef.current = null;
                    }
                    setModelBlobUrl(null);
                    setStressResult(null);
                }
            } catch (error) {
                const message = getErrorMessage(error, 'Failed to delete project');
                console.error('[useViewerProjects] deleteProject:', message);
                addNotification(message, 'error');
            }
        },
        [addNotification, fetchProjects, currentProjectId]
    );

    // ============================
    // Rename Project
    // ============================
    const renameProject = useCallback(
        async (projectId: number, newName: string): Promise<boolean> => {
            try {
                await projectsApi.renameProject(projectId, newName);
                addNotification('Project renamed successfully.', 'success');
                await fetchProjects();
                return true;
            } catch (error) {
                const message = getErrorMessage(error, 'Failed to rename project');
                console.error('[useViewerProjects] renameProject:', message);
                addNotification(message, 'error');
                return false;
            }
        },
        [addNotification, fetchProjects]
    );

    // ============================
    // Run Stress Simulation
    // ============================
    const runStressSimulation = useCallback(
        async (projectId: number): Promise<void> => {
            setIsSimulating(true);
            setStressResult(null);
            addNotification('Running stress simulation...', 'info');

            try {
                const result = await projectsApi.simulateStress(projectId);
                setStressResult(result);
                addNotification('Stress simulation completed!', 'success');
            } catch (error) {
                const message = getErrorMessage(error, 'Stress simulation failed');
                console.error('[useViewerProjects] runStressSimulation:', message);
                addNotification(message, 'error');
            } finally {
                setIsSimulating(false);
            }
        },
        [addNotification]
    );

    // ============================
    // Reset Camera
    // ============================
    const resetCamera = useCallback(() => {
        setCameraResetTrigger((prev) => prev + 1);
    }, []);

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
        currentProject,
        modelBlobUrl,
        isLoadingModel,
        isSimulating,
        stressResult,
        selectProject,
        uploadFile,
        deleteProject,
        renameProject,
        runStressSimulation,
        resetCamera,
        cameraResetTrigger,
    };
};
