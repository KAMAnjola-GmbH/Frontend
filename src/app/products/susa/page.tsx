// app/products/susa/page.tsx
'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import MainContent from '@/app/components/susa/MainContent';
import { useSusaContext } from '@/app/context/SusaProjectContext';

const SusaProductPage: React.FC = () => {
    const {
        currentProjectId,
        currentProjectStatus,
        currentAnalysis,
        mappingData,
        isFetchingResults,
        saveMappingsAndRunAnalysis
    } = useSusaContext();

    return (

        <div className="flex w-full h-full">
            <video autoPlay loop muted playsInline id="bg-video">
                <source src="/R0sitavideobg.mp4" type="video/mp4" />
            </video>
            <MainContent
                currentProjectId={currentProjectId}
                currentProjectStatus={currentProjectStatus}
                currentAnalysis={currentAnalysis}
                mappingData={mappingData}
                isFetchingResults={isFetchingResults}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                saveMappingsAndRunAnalysis={saveMappingsAndRunAnalysis as any}
            />
        </div>
    );
};

export default withPageAuthRequired(SusaProductPage);