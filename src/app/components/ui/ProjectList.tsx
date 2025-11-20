// components/Dashboard/ProjectList.tsx
'use client';

import React, { useState } from 'react';
import { SusaProject, ProjectStatus } from '@/types/susa'; // <<<<<<< UPDATED TYPE IMPORT
import DeleteModal from './modals/DeleteModal';
import RenameModal from './modals/RenameModal';
//import { viewerControls } from '@/lib/utils/viewer';

interface ProjectListProps {
    projects: SusaProject[]; // SusaProject has ID as number
    isLoading: boolean;
    currentProjectId: number | null; // ID is number
    currentProjectStatus: ProjectStatus | null; // Added status
    selectProject: (id: number) => void;
    deleteProject: (id: number) => void;
    renameProject: (id: number, newName: string) => Promise<boolean>;
    runSimulation: (id: number) => Promise<boolean | void>; // Mapped to fetchAnalysisResults
}

const getStatusColorClass = (status: ProjectStatus) => {
    switch (status) {
        case 'Analysis Complete': return 'bg-green-500/20 text-green-400';
        case 'Ready for Mapping': return 'bg-yellow-500/20 text-yellow-400';
        case 'Mapping in Progress': return 'bg-blue-500/20 text-blue-400';
        case 'Processing': return 'bg-indigo-500/20 text-indigo-400 animate-pulse';
        case 'Failed': return 'bg-red-500/20 text-red-400';
        case 'Queued':
        default: return 'bg-gray-500/20 text-gray-400';
    }
}

const ProjectList: React.FC<ProjectListProps> = ({
    projects,
    isLoading,
    currentProjectId,
    currentProjectStatus,
    selectProject,
    deleteProject,
    renameProject,
    runSimulation,
}) => {
    // State to manage context menu visibility and position
    const [menuState, setMenuState] = useState<{
        isOpen: boolean;
        projectId: number; // ID is number
        projectName: string;
        projectStatus: ProjectStatus;
        x: number;
        y: number;
    } | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

    const openContextMenu = (e: React.MouseEvent<HTMLButtonElement>, project: SusaProject) => {
        e.stopPropagation();
        setMenuState({
            isOpen: true,
            projectId: project.id,
            projectName: project.originalFileName,
            projectStatus: project.status,
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleMenuAction = (action: 'rename' | 'delete' | 'analyze') => {
        if (!menuState) return;

        if (action === 'analyze') {
            selectProject(menuState.projectId); // Use selectProject to handle the flow (mapping or fetching results)
            //viewerControls.clearScene(); // Clear scene if a new analysis starts
        } else if (action === 'delete') {
            setIsDeleteModalOpen(true);
        } else if (action === 'rename') {
            setIsRenameModalOpen(true);
        }
        setMenuState(null);
    };

    // Close context menu on any click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // Only close if click is not inside a modal or a project button
            const isProjectButton = target.closest('[data-project-id]');
            if (menuState?.isOpen && !isProjectButton) {
                setMenuState(null);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [menuState]);

    const handleDeleteConfirm = () => {
        if (menuState) {
            deleteProject(menuState.projectId);
            setIsDeleteModalOpen(false);
        }
    };

    const handleRenameConfirm = async (newName: string) => {
        if (menuState) {
            await renameProject(menuState.projectId, newName);
            setIsRenameModalOpen(false);
        }
    };

    const getAnalyzeButtonText = (status: ProjectStatus) => {
        switch (status) {
            case 'Analysis Complete': return 'View Report';
            case 'Ready for Mapping': return 'Start Mapping/Analysis';
            case 'Mapping in Progress': return 'Continue Mapping';
            case 'Processing': return 'View Status';
            default: return 'Analyze';
        }
    }


    if (isLoading) {
        return <li className="p-3 bg-gray-900/50 rounded-md text-center text-gray-400">Loading projects...</li>;
    }

    return (
        <>
            <ul id="project-list" className="space-y-2">
                {projects.length === 0 ? (
                    <li className="p-3 bg-gray-900/50 rounded-md text-center text-gray-400">No projects found.</li>
                ) : (
                    projects.map(project => (
                        <li 
                            key={project.id} 
                            className={`group p-3 flex justify-between items-center rounded-lg transition ${
                                currentProjectId === project.id 
                                ? 'bg-indigo-600/70 shadow-lg' 
                                : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                        >
                            <div className="flex-grow min-w-0 cursor-pointer" onClick={() => selectProject(project.id)}>
                                <span className="block text-gray-100 font-semibold truncate text-sm">{project.originalFileName}</span>
                                <span className="block text-gray-400 text-xs">ID: {project.id}</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass(project.status)} mt-1`}>
                                    {project.status}
                                </span>
                            </div>
                            <button
                                onClick={(e) => openContextMenu(e, project)}
                                data-project-id={project.id}
                                className={`p-1 rounded-full text-gray-400 hover:bg-gray-600 transition ${currentProjectId === project.id ? 'text-white' : ''}`}
                                title="Project Actions"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pointer-events-none" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                            </button>
                        </li>
                    ))
                )}
            </ul>

            {/* Context Menu */}
            {menuState && menuState.isOpen && (
                <div id="project-context-menu" className="absolute z-50 bg-gray-700 border border-gray-600 rounded-lg shadow-xl py-1 w-48 transition-all duration-100 ease-out" 
                     style={{ top: menuState.y + 10, left: menuState.x - 192 }} 
                >
                    <button onClick={() => handleMenuAction('analyze')} className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-indigo-600 transition flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                        <span>{getAnalyzeButtonText(menuState.projectStatus)}</span>
                    </button>
                    <button onClick={() => handleMenuAction('rename')} className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-indigo-600 transition flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        Rename
                    </button>
                    <button onClick={() => handleMenuAction('delete')} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white transition flex items-center gap-2 border-t border-gray-600 mt-1 pt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Delete
                    </button>
                </div>
            )}

            {/* Modals */}
            {menuState && (
                <>
                    <DeleteModal 
                        isOpen={isDeleteModalOpen} 
                        onClose={() => setIsDeleteModalOpen(false)} 
                        onConfirm={handleDeleteConfirm}
                    />
                    <RenameModal 
                        isOpen={isRenameModalOpen}
                        onClose={() => setIsRenameModalOpen(false)}
                        currentName={menuState.projectName}
                        onConfirm={handleRenameConfirm}
                    />
                </>
            )}
        </>
    );
};

export default ProjectList;