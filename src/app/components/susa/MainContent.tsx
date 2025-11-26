'use client';

import React, { useEffect, useRef } from 'react';
import { AnalysisResult, PreAnalysisResult, ProjectStatus } from '@/types/susa';
import MappingUI from './MappingInterface';
import AnalysisReport from './AnalysisReport';

interface MainContentProps {
  currentProjectId: number | null;
  currentProjectStatus: ProjectStatus | null;
  currentAnalysis: AnalysisResult | null;
  mappingData: PreAnalysisResult | null;
  isFetchingResults: boolean;
  saveMappingsAndRunAnalysis: (id: number, mappings: Record<string, string>) => Promise<void>;
}

const MainContent: React.FC<MainContentProps> = ({
  currentProjectId,
  currentProjectStatus,
  currentAnalysis,
  mappingData,
  isFetchingResults,
  saveMappingsAndRunAnalysis,
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      // Viewer not used in SUSA
    }
  }, []);

  const renderContent = () => {
    if (currentProjectId && mappingData) {
      return (
        <MappingUI
          uploadId={currentProjectId}
          data={mappingData}
          onSave={saveMappingsAndRunAnalysis} // fully typed
        />
      );
    }

    if (currentAnalysis) {
      return <AnalysisReport analysis={currentAnalysis} />;
    }

    if (
      currentProjectId &&
      (currentProjectStatus === 'Queued' ||
        currentProjectStatus === 'Processing' ||
        isFetchingResults)
    ) {
      const message = isFetchingResults
        ? 'Loading analysis results...'
        : `Job ${currentProjectId} is ${currentProjectStatus}.`;
      return (
        <div className="flex-grow bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400 text-lg p-6">
          <svg
            className="animate-spin h-8 w-8 text-blue-400 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p>{message}</p>
          {!isFetchingResults && (
            <p className="text-sm mt-2">
              You will be notified when it&apos;s complete.
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="flex-grow bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-lg">
        Select a project or upload a new file to start analysis.
      </div>
    );
  };

  return (
    <main className="flex-grow p-6 flex flex-col gap-6 dashboard-main-background overflow-auto">
      <div id="main-content-area" className="flex-grow flex flex-col gap-6 min-h-full">
        {renderContent()}
      </div>
    </main>
  );
};

export default MainContent;
