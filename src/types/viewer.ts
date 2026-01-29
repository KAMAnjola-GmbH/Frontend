// src/types/viewer.ts

export type ViewerProjectStatus = 'Ready' | 'Processing' | 'Failed';

export interface ViewerProject {
    id: number;
    name: string;
    originalFileName: string;
    uploadedAt: string;
    status: ViewerProjectStatus;
}

export interface StressSimulationResult {
    file: string;
    simulation_type: string;
    results: {
        max_stress: number;
        min_stress: number;
        average_stress?: number;
        unit: string;
    };
}

export interface UploadProjectResponse {
    id: number;
    name: string;
    originalFileName: string;
    uploadedAt: string;
    status: string;
}
