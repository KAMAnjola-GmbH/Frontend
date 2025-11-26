// src/types/susa.ts

export type ProjectStatus = 
    | 'Ready for Mapping' 
    | 'Mapping in Progress' 
    | 'Analysis Complete' 
    | 'Failed' 
    | 'Queued'
    | 'Processing';

export interface SusaProject {
    id: number; // SuSaManager used number for ID
    originalFileName: string;
    uploadedAt: string;
    status: ProjectStatus;
    // Add other base properties as needed
}

export interface JobUpdateData {
    jobId: number;
    status: ProjectStatus;
    error?: string;
    // potentially pdfS3Key, excelS3Key, etc. 
}

export interface UnmappedAccount {
    konto: string;
    bezeichnung: string;
}

export interface PreAnalysisResult {
    unmappedAccounts: UnmappedAccount[];
    availableCategories: string[];
}

export interface KpiRow {
    Gruppe: string;
    Erlöse: number;
    Personalkosten: number;
    "Overhead-Kosten": number;
    EBIT: number;
    "Personalkosten in %": number;
    "Overhead-Kosten in %": number;

    AdditionalData?: Record<string, unknown>;

    // allow dynamic undervalues
    [key: string]: string | number | null | undefined | Record<string, unknown>;
}



export interface ResultFiles {
    taskId: string;
    pdfS3Key?: string;
    excelS3Key?: string;
    csvS3Key?: string;
}

export interface AnalysisResult {
    reportTitle: string;
    kpiResults: KpiRow[];
    resultFiles: ResultFiles;
    // Add other analysis metrics here
}