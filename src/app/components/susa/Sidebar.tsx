// components/Dashboard/SusaSidebar.tsx
'use client';

import React from 'react';
import GenericSidebar from '../ui/GenericSidebar';
import ProjectList from '../ui/ProjectList';
import { useSusaContext } from '@/app/context/SusaProjectContext';

const SusaSidebar: React.FC = () => {
  const {
    projects,
    isLoading,
    currentProjectId,
    currentProjectStatus,
    selectProject,
    deleteProject,
    renameProject,
    fetchAnalysisResults,
    uploadFile,
  } = useSusaContext();

  return (
    <GenericSidebar
      title="Susa Analytics"
      uploadLabel="Upload Susa CSV"
      acceptedFileTypes=".csv,.xlsx"
      onUpload={uploadFile}
    >
      {/* We inject the Susa-specific List here */}
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
    </GenericSidebar>
  );
};

export default SusaSidebar;