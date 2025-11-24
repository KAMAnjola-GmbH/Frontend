// app/products/susa/page.tsx
'use client';

// Note: Auth is already handled by the layout, but keeping it here is fine for double safety
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import MainContent from '@/app/components/susa/MainContent';
import { useSusaContext } from '@/app/context/SusaProjectContext';

const SusaProductPage: React.FC = () => {
    // We can use the context here because this page is wrapped by SusaLayout
    const {
        currentProjectId,
        currentProjectStatus,
        currentAnalysis,
        mappingData,
        isFetchingResults,
        saveMappingsAndRunAnalysis
    } = useSusaContext();

    return (
        // relative h-full ensures the video fills this main panel

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
                saveMappingsAndRunAnalysis={saveMappingsAndRunAnalysis as any}
            />
        </div>
    );
};

export default withPageAuthRequired(SusaProductPage);