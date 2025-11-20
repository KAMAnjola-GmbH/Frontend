// components/Dashboard/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import ProjectList from './ProjectList';
import { useSusaContext } from '@/app/context/SusaProjectContext'; // Use Context

const Sidebar: React.FC = () => {
    // Consume the shared context
    const susaProjectLogic = useSusaContext();
    
    const { 
        projects, 
        isLoading, 
        currentProjectId, 
        selectProject, 
        uploadFile, 
        deleteProject, 
        renameProject,
        fetchAnalysisResults,
        currentProjectStatus 
    } = susaProjectLogic;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now()); 

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
            if (success) {
                setSelectedFile(null);
                setFileInputKey(Date.now());
            }
        }
    };

    return (
        <aside className="w-64 bg-[#001e5f] flex flex-col flex-shrink-0 border-r border-gray-700 h-full">
            <div className="p-4 flex-shrink-0">
                <div className="text-center font-semibold text-lg text-white/90">Products And Services</div>
                <a href="#" className="block px-4 py-2.5 mt-2 rounded-md hover:bg-blue-500/50 text-white transition font-semibold">Home</a>
                
                <h2 className="text-lg font-semibold mt-6 mb-2 text-white border-t border-gray-700 pt-4">Project List</h2>
                
                {/* Upload Section */}
                <div className="mb-4 p-3 bg-gray-900/50 rounded-lg">
                    <h2 className="text-base font-bold mb-2 text-indigo-300">Upload SuSa CSV</h2>
                    <input 
                        key={fileInputKey} 
                        id="susa-file-input"
                        type="file" 
                        accept=".csv,.xlsx" 
                        className="mb-2 p-2 rounded text-black bg-gray-700 border border-gray-600 w-full text-sm"
                        onChange={handleFileChange}
                    />
                    <button 
                        onClick={handleUploadClick} 
                        disabled={!selectedFile}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 w-full mt-2 transition disabled:bg-gray-500 disabled:opacity-70 font-semibold text-sm"
                    >
                        Upload
                    </button>
                </div>
            </div>
            
            <div className="flex-grow overflow-y-auto px-4 pb-4">
                <ProjectList 
                    projects={projects}
                    isLoading={isLoading}
                    currentProjectId={currentProjectId}
                    currentProjectStatus={currentProjectStatus} 
                    selectProject={selectProject}
                    deleteProject={deleteProject}
                    renameProject={renameProject}
                    runSimulation={fetchAnalysisResults} 
                />
            </div>
        </aside>
    );
};

export default Sidebar;