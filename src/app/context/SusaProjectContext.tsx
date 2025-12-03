'use client';

import React, { createContext, useContext } from 'react';
import { useSusaProjects } from '@/hooks/useSusaProjects';

// Define the type based on the return value of your hook
type SusaProjectContextType = ReturnType<typeof useSusaProjects>;

const SusaProjectContext = createContext<SusaProjectContextType | null>(null);

export const SusaProjectProvider = ({ children }: { children: React.ReactNode }) => {
    const susaLogic = useSusaProjects();

    return (
        <SusaProjectContext.Provider value={susaLogic}>
            {children}
        </SusaProjectContext.Provider>
    );
};

export const useSusaContext = () => {
    const context = useContext(SusaProjectContext);
    if (!context) {
        throw new Error('useSusaContext must be used within a SusaProjectProvider');
    }
    return context;
};