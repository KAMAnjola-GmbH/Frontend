'use client';

import React, { createContext, useContext } from 'react';
import { useViewerProjects } from '@/hooks/useViewerProjects';

type ViewerProjectContextType = ReturnType<typeof useViewerProjects>;

const ViewerProjectContext = createContext<ViewerProjectContextType | null>(null);

export const ViewerProjectProvider = ({ children }: { children: React.ReactNode }) => {
    const viewerLogic = useViewerProjects();

    return (
        <ViewerProjectContext.Provider value={viewerLogic}>
            {children}
        </ViewerProjectContext.Provider>
    );
};

export const useViewerContext = () => {
    const context = useContext(ViewerProjectContext);
    if (!context) {
        throw new Error('useViewerContext must be used within a ViewerProjectProvider');
    }
    return context;
};
