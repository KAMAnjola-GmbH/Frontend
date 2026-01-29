// components/viewer/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useViewerContext } from '@/app/context/ViewerProjectContext';
import DeleteModal from '../ui/modals/DeleteModal';
import RenameModal from '../ui/modals/RenameModal';
import type { ViewerProject, ViewerProjectStatus } from '@/types/viewer';

const getStatusColorClass = (status: ViewerProjectStatus) => {
    switch (status) {
        case 'Ready':
            return 'bg-green-500/20 text-green-400';
        case 'Processing':
            return 'bg-indigo-500/20 text-indigo-400 animate-pulse';
        case 'Failed':
            return 'bg-red-500/20 text-red-400';
        default:
            return 'bg-gray-500/20 text-gray-400';
    }
};

const ViewerSidebar: React.FC = () => {
    const t = useTranslations('viewer');
    const tCommon = useTranslations('common');

    const {
        projects,
        isLoading,
        currentProjectId,
        selectProject,
        deleteProject,
        renameProject,
        uploadFile,
    } = useViewerContext();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [menuState, setMenuState] = useState<{
        isOpen: boolean;
        projectId: number;
        projectName: string;
        x: number;
        y: number;
    } | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const handleUploadClick = async () => {
        if (selectedFile) {
            const success = await uploadFile(selectedFile);
            if (success !== false) {
                setSelectedFile(null);
                setFileInputKey((prev) => prev + 1);
            }
        }
    };

    const openContextMenu = (e: React.MouseEvent<HTMLButtonElement>, project: ViewerProject) => {
        e.stopPropagation();
        setMenuState({
            isOpen: true,
            projectId: project.id,
            projectName: project.name || project.originalFileName,
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleMenuAction = (action: 'view' | 'rename' | 'delete') => {
        if (!menuState) return;

        if (action === 'view') {
            selectProject(menuState.projectId);
            setMenuState(null);
        } else if (action === 'delete') {
            setIsDeleteModalOpen(true);
            setMenuState((prev) => (prev ? { ...prev, isOpen: false } : null));
        } else if (action === 'rename') {
            setIsRenameModalOpen(true);
            setMenuState((prev) => (prev ? { ...prev, isOpen: false } : null));
        }
    };

    React.useEffect(() => {
        if (!menuState?.isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const isProjectButton = target.closest('[data-project-id]');
            if (!isProjectButton) {
                setMenuState(null);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [menuState?.isOpen]);

    const handleDeleteConfirm = () => {
        if (menuState) {
            deleteProject(menuState.projectId);
            setIsDeleteModalOpen(false);
            setMenuState(null);
        }
    };

    const handleRenameConfirm = async (newName: string) => {
        if (menuState) {
            await renameProject(menuState.projectId, newName);
            setIsRenameModalOpen(false);
            setMenuState(null);
        }
    };

    const handleModalClose = (modalType: 'delete' | 'rename') => {
        if (modalType === 'delete') {
            setIsDeleteModalOpen(false);
        } else {
            setIsRenameModalOpen(false);
        }
        setMenuState(null);
    };

    return (
        <aside className="w-full h-full flex flex-col min-h-0 bg-[#001e5f]">
            <div className="p-4 flex-shrink-0">
                <div className="text-center font-semibold text-lg text-white/90">{t('title')}</div>

                <Link
                    href="/"
                    className="block px-4 py-2.5 mt-2 text-center rounded-md hover:bg-blue-500/50 text-white transition font-semibold"
                >
                    {t('home')}
                </Link>

                <h2 className="text-lg font-semibold mt-6 mb-2 text-white border-t border-gray-700 pt-4">
                    {t('items')}
                </h2>

                {/* Upload Section */}
                <div className="mb-4 p-3 bg-gray-900/50 rounded-lg">
                    <h2 className="text-base font-bold mb-2 text-indigo-300">{t('upload_label')}</h2>
                    <input
                        key={fileInputKey}
                        type="file"
                        accept=".glb,.gltf"
                        className="mb-2 p-2 rounded text-black bg-gray-700 border border-gray-600 w-full text-sm"
                        onChange={handleFileChange}
                    />
                    <button
                        onClick={handleUploadClick}
                        disabled={!selectedFile}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 w-full mt-2 transition disabled:bg-gray-500 disabled:opacity-70 font-semibold text-sm"
                    >
                        {t('upload')}
                    </button>
                </div>
            </div>

            {/* Project List */}
            <div className="flex-grow overflow-y-auto px-4 pb-4">
                {isLoading ? (
                    <div className="space-y-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-16 bg-gray-700/50 rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <ul id="project-list" className="space-y-2">
                        {projects.length === 0 ? (
                            <li className="p-3 bg-gray-900/50 rounded-md text-center text-gray-400">
                                {t('no_projects')}
                            </li>
                        ) : (
                            projects.map((project) => (
                                <li
                                    key={project.id}
                                    className={`group p-3 flex justify-between items-center rounded-lg transition ${
                                        currentProjectId === project.id
                                            ? 'bg-indigo-600/70 shadow-lg'
                                            : 'bg-gray-800 hover:bg-gray-700'
                                    }`}
                                >
                                    <div
                                        className="flex-grow min-w-0 cursor-pointer"
                                        onClick={() => selectProject(project.id)}
                                    >
                                        <span className="block text-gray-100 font-semibold truncate text-sm">
                                            {project.name || project.originalFileName}
                                        </span>
                                        <span className="block text-gray-400 text-xs">ID: {project.id}</span>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass(
                                                project.status
                                            )} mt-1`}
                                        >
                                            {project.status}
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => openContextMenu(e, project)}
                                        data-project-id={project.id}
                                        className={`p-1 rounded-full text-gray-400 hover:bg-gray-600 transition ${
                                            currentProjectId === project.id ? 'text-white' : ''
                                        }`}
                                        title={t('project_actions')}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 pointer-events-none"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                )}

                {/* Context Menu */}
                {menuState && menuState.isOpen && (
                    <div
                        id="project-context-menu"
                        className="fixed z-50 bg-gray-700 border border-gray-600 rounded-lg shadow-xl py-1 w-48 transition-all duration-100 ease-out"
                        style={{ top: menuState.y + 10, left: menuState.x - 192 }}
                    >
                        <button
                            onClick={() => handleMenuAction('view')}
                            className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-indigo-600 transition flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                            <span>{t('view_model')}</span>
                        </button>
                        <button
                            onClick={() => handleMenuAction('rename')}
                            className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-indigo-600 transition flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                            {tCommon('edit')}
                        </button>
                        <button
                            onClick={() => handleMenuAction('delete')}
                            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white transition flex items-center gap-2 border-t border-gray-600 mt-1 pt-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                            {tCommon('delete')}
                        </button>
                    </div>
                )}
            </div>

            {/* Modals */}
            {menuState && (
                <>
                    <DeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => handleModalClose('delete')}
                        onConfirm={handleDeleteConfirm}
                    />
                    <RenameModal
                        isOpen={isRenameModalOpen}
                        onClose={() => handleModalClose('rename')}
                        currentName={menuState.projectName}
                        onConfirm={handleRenameConfirm}
                    />
                </>
            )}
        </aside>
    );
};

export default ViewerSidebar;
