// app/products/susa/page.tsx
'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import MainContent from '@/app/components/susa/MainContent';
import { useSusaContext } from '@/app/context/SusaProjectContext'; // Use Context

const SusaProductPage: React.FC = () => {
    // Access the shared state
    const susaProjectLogic = useSusaContext();

    const { 
        currentProjectId, 
        currentProjectStatus,
        currentAnalysis, 
        mappingData,
        isFetchingResults,
        saveMappingsAndRunAnalysis 
    } = susaProjectLogic;

    return (
        <div className="flex w-full h-full"> 
            <MainContent 
                currentProjectId={currentProjectId}
                currentProjectStatus={currentProjectStatus}
                currentAnalysis={currentAnalysis}
                mappingData={mappingData}
                isFetchingResults={isFetchingResults}
                saveMappingsAndRunAnalysis={saveMappingsAndRunAnalysis as any} 
            />
        </div>
    );
};

export default withPageAuthRequired(SusaProductPage);