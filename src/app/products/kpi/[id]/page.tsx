'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MappingUI } from '@/components/MappingUI';
import { ResultsDashboard } from '@/components/ResultsDashboard';

// Define types for your API responses
type ViewState = 'loading' | 'mapping' | 'results' | 'processing' | 'error';
type ProjectDetails = { id: number; status: string; /* ...other fields */ };
type PreAnalysisResult = { unmappedAccounts: any[]; availableCategories: string[] };
type AnalysisResult = { kpiResults: any[]; resultFiles: any; reportTitle: string };

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;

  const [viewState, setViewState] = useState<ViewState>('loading');
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [mappingData, setMappingData] = useState<PreAnalysisResult | null>(null);
  const [resultsData, setResultsData] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // This is the core logic, replacing selectProject
  useEffect(() => {
    if (!id) return;

    const loadProjectData = async () => {
      setViewState('loading');
      setError(null);
      
      try {
        // 1. Get project details to check status
        const projectRes = await fetch(`/api/susa/${id}`);
        if (!projectRes.ok) throw new Error('Failed to fetch project details.');
        const projectDetails: ProjectDetails = await projectRes.json();
        setProject(projectDetails);

        // 2. Decide what to do based on status
        if (projectDetails.status === 'Ready for Mapping' || projectDetails.status === 'Mapping in Progress') {
          // Replaces performPreAnalysis
          const preAnalysisRes = await fetch(`/api/susa/${id}/pre-analyze`, { method: 'POST' });
          if (!preAnalysisRes.ok) throw new Error('Failed to start pre-analysis.');
          const preAnalysisData = await preAnalysisRes.json();
          setMappingData(preAnalysisData);
          setViewState('mapping');
        } else if (projectDetails.status === 'Analysis Complete') {
          // Replaces fetchAndDisplayAnalysisResults
          const resultsRes = await fetch(`/api/susa/${id}/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mappings: {} }), // Fetch cached results
          });
          if (!resultsRes.ok) throw new Error('Failed to load analysis results.');
          const results = await resultsRes.json();
          setResultsData(results);
          setViewState('results');
        } else if (projectDetails.status.startsWith('Failed')) {
          throw new Error(`Analysis failed: ${projectDetails.status}`);
        } else {
          // e.g., 'Queued'
          setViewState('processing');
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An unknown error occurred.');
        setViewState('error');
      }
    };

    loadProjectData();
  }, [id]); // Re-run this whole effect if the 'id' in the URL changes

  // This renders the correct component based on the state
  const renderContent = () => {
    switch (viewState) {
      case 'loading':
        return <div className="...">Loading project data...</div>; // Or your loading.tsx
      case 'mapping':
        if (!mappingData) return null;
        return <MappingUI projectId={id} data={mappingData} />;
      case 'results':
        if (!resultsData) return null;
        return <ResultsDashboard data={resultsData} />;
      case 'processing':
        return (
          <div className="...">
            <p>Job is processing...</p>
            <p>You will be notified when it's complete.</p>
          </div>
        );
      case 'error':
        return <div className="text-red-400">{error}</div>;
      default:
        return null;
    }
  };

  return (
    <div id="main-content-area" className="flex-grow flex flex-col gap-6">
      {renderContent()}
    </div>
  );
}