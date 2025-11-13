'use client';

import React, { createContext, useState, useContext, useCallback } from 'react';

// Define project type based on your API response
interface Project {
  id: number;
  originalFileName: string;
  uploadedAt: string;
  status: string;
}

interface ProjectContextType {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  isLoading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // This replaces fetchAndDisplayList
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      // We fetch from our *Next.js API route* which proxies the .NET backend
      const response = await fetch('/api/susa'); 
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
      // You'd also set an error state here
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, fetchProjects, isLoading }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};