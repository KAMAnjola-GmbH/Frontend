/**
 * SUSA (Summen und Salden) API Client.
 * Financial analysis microservice endpoints.
 *
 * @example
 * import { susaApi } from '@/services/api/susa';
 *
 * const projects = await susaApi.getProjects();
 * const result = await susaApi.analyze(projectId, mappings);
 */

import { apiClient } from './client';
import type {
  SusaProject,
  PreAnalysisResult,
  AnalysisResult,
} from '@/types/susa';

const BASE = '/susa';

/**
 * Response from upload endpoint.
 */
interface UploadResponse {
  id: number;
  originalFileName: string;
  uploadedAt: string;
  status: string;
}

/**
 * Response from analyze endpoint when job is queued.
 */
interface AnalyzeQueuedResponse {
  jobId: number;
  status: string;
}

/**
 * SUSA API methods.
 */
export const susaApi = {
  /**
   * Get all SUSA projects for current user.
   */
  getProjects(): Promise<SusaProject[]> {
    return apiClient.get<SusaProject[]>(BASE);
  },

  /**
   * Upload Excel file for analysis.
   * @param file - Excel file (.xlsx, .xls)
   */
  uploadFile(file: File): Promise<UploadResponse> {
    return apiClient.upload<UploadResponse>(`${BASE}/upload`, file);
  },

  /**
   * Get project details by ID.
   * @param id - Project ID
   */
  getProject(id: number): Promise<SusaProject> {
    return apiClient.get<SusaProject>(`${BASE}/${id}`);
  },

  /**
   * Run pre-analysis to get unmapped accounts.
   * This identifies accounts that need manual mapping.
   * @param id - Project ID
   */
  preAnalyze(id: number): Promise<PreAnalysisResult> {
    return apiClient.post<PreAnalysisResult>(`${BASE}/${id}/pre-analyze`);
  },

  /**
   * Start full analysis with account mappings.
   * Returns cached result if already completed, or queues new job.
   * @param id - Project ID
   * @param mappings - Account to category mappings
   */
  analyze(
    id: number,
    mappings: Record<string, string>
  ): Promise<AnalysisResult | AnalyzeQueuedResponse> {
    return apiClient.post<AnalysisResult | AnalyzeQueuedResponse>(
      `${BASE}/${id}/analyze`,
      { mappings }
    );
  },

  /**
   * Delete a project and all associated files.
   * @param id - Project ID
   */
  deleteProject(id: number): Promise<void> {
    return apiClient.delete<void>(`${BASE}/${id}`);
  },

  /**
   * Rename a project.
   * @param id - Project ID
   * @param newName - New project name
   */
  renameProject(id: number, newName: string): Promise<void> {
    return apiClient.put<void>(`${BASE}/${id}/rename`, { newName });
  },

  /**
   * Download analysis result file.
   * @param taskId - Analysis task ID
   * @param fileName - File name (e.g., 'financial_report.pdf')
   */
  downloadFile(taskId: string, fileName: string): Promise<Blob> {
    return apiClient.download(`${BASE}/download-result/${taskId}/${fileName}`);
  },
};
