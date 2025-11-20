// src/types/index.ts

export interface Project {
    id: string;
    name: string;
    // Add other properties if your projects object has them
    // e.g., date: string;
}

export interface SimulationResults {
    simulation_type: string;
    summary: string;
    max_stress: number;
    min_stress: number;
    unit: string;
}

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
    id: number;
    message: string;
    type: NotificationType;
}

// Interface for the Viewer utility functions
export interface ViewerControls {
    initViewer: (container: HTMLElement) => () => void; // Returns the resize handler
    loadModel: (projectId: string) => void;
    clearScene: () => void;
}

// Interfaces for props that are passed down to components
export interface SidebarProps {
    projects: Project[];
    onUploadFile: (file: File) => Promise<void>;
    onSelectProject: (projectId: string) => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}