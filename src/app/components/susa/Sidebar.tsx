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
    selectProject,
    deleteProject,
    renameProject,
    uploadFile,
  } = useSusaContext();

  return (
    <GenericSidebar
      title="Susa Analytics"
      uploadLabel="Upload Susa CSV"
      acceptedFileTypes=".csv,.xlsx"
      onUpload={uploadFile}
    >
      <ProjectList
        projects={projects}
        isLoading={isLoading}
        currentProjectId={currentProjectId}
        selectProject={selectProject}
        deleteProject={deleteProject}
        renameProject={renameProject}
      />
    </GenericSidebar>
  );
};

export default SusaSidebar;