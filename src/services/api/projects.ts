/**
 * 3D Projects API Client.
 * Endpoints for managing 3D model projects.
 *
 * @example
 * import { projectsApi } from '@/services/api/projects';
 *
 * const projects = await projectsApi.getProjects();
 * const modelBlob = await projectsApi.downloadModel(projectId);
 */

import { apiClient } from './client';
import type {
    ViewerProject,
    StressSimulationResult,
    UploadProjectResponse,
} from '@/types/viewer';

const BASE = '/projects';

/**
 * 3D Projects API methods.
 */
export const projectsApi = {
    /**
     * Get all 3D projects for current user.
     */
    getProjects(): Promise<ViewerProject[]> {
        return apiClient.get<ViewerProject[]>(BASE);
    },

    /**
     * Upload GLB/GLTF file for viewing.
     * @param file - 3D model file (.glb, .gltf)
     */
    uploadFile(file: File): Promise<UploadProjectResponse> {
        return apiClient.upload<UploadProjectResponse>(`${BASE}/upload`, file);
    },

    /**
     * Get project details by ID.
     * @param id - Project ID
     */
    getProject(id: number): Promise<ViewerProject> {
        return apiClient.get<ViewerProject>(`${BASE}/${id}`);
    },

    /**
     * Download 3D model binary data.
     * @param id - Project ID
     * @returns Promise with Blob containing GLB data
     */
    downloadModel(id: number): Promise<Blob> {
        return apiClient.download(`${BASE}/${id}`);
    },

    /**
     * Delete a project and all associated files.
     * @param id - Project ID
     */
    deleteProject(id: number): Promise<void> {
        return apiClient.delete<void>(`${BASE}/${id}`);
    },

    /**
     * Rename a project.
     * @param id - Project ID
     * @param newName - New project name
     */
    renameProject(id: number, newName: string): Promise<void> {
        return apiClient.put<void>(`${BASE}/${id}/rename`, { newName });
    },

    /**
     * Run stress simulation on a project.
     * @param id - Project ID
     * @returns Promise with stress simulation results
     */
    simulateStress(id: number): Promise<StressSimulationResult> {
        return apiClient.post<StressSimulationResult>(`${BASE}/${id}/simulate/stress`);
    },
};
