/**
 * import { apiClient } from './client';
 * export const susaApi = {
 *   getProjects: () => apiClient.get<Project[]>('/susa'),
 * };
 */

import { config } from '@/app/config';

/**
 * Custom error class for API errors.
 * Contains status code and optional response data.
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }

  /**
   * Check if error is a specific HTTP status.
   */
  is(status: number): boolean {
    return this.status === status;
  }

  /**
   * Check if error is unauthorized (401).
   */
  isUnauthorized(): boolean {
    return this.status === 401;
  }

  /**
   * Check if error is not found (404).
   */
  isNotFound(): boolean {
    return this.status === 404;
  }
}

/**
 * Request options extending native fetch options.
 */
interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
}

/** Default request timeout: 30 seconds */
const DEFAULT_TIMEOUT = 30000;

/**
 * Central API client for all microservices.
 * Uses Next.js API proxy for secure token handling.
 */
export const apiClient = {
  /**
   * Generic request method.
   * @param endpoint - API endpoint (e.g., '/susa', '/projects/123')
   * @param options - Fetch options with typed body
   * @returns Promise with typed response
   */
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${config.apiProxyBaseUrl}${endpoint}`;
    const { body, headers: customHeaders, timeout = DEFAULT_TIMEOUT, ...restOptions } = options;

    const headers: HeadersInit = {
      ...(customHeaders as Record<string, string>),
    };

    // Add Content-Type for JSON bodies (not FormData)
    if (body && !(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    // Development logging (no sensitive data)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${options.method || 'GET'} ${endpoint}`);
    }

    // Setup timeout with AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    let response: Response;
    try {
      response = await fetch(url, {
        ...restOptions,
        headers,
        signal: controller.signal,
        body: body instanceof FormData
          ? body
          : body
            ? JSON.stringify(body)
            : undefined,
      });
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError(408, 'Request Timeout', { message: `Request timed out after ${timeout}ms` });
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }

    // Handle errors
    if (!response.ok) {
      let errorData: unknown = null;

      try {
        errorData = await response.json();
      } catch {
        // Response might not be JSON
      }

      throw new ApiError(response.status, response.statusText, errorData);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    // Handle 202 Accepted (for async operations)
    // Still parse JSON as it may contain job info
    return response.json();
  },

  /**
   * GET request.
   * @param endpoint - API endpoint
   */
  get<T>(endpoint: string): Promise<T> {
    return apiClient.request<T>(endpoint, { method: 'GET' });
  },

  /**
   * POST request.
   * @param endpoint - API endpoint
   * @param body - Request body (will be JSON.stringify'd)
   */
  post<T>(endpoint: string, body?: unknown): Promise<T> {
    return apiClient.request<T>(endpoint, { method: 'POST', body });
  },

  /**
   * PUT request.
   * @param endpoint - API endpoint
   * @param body - Request body (will be JSON.stringify'd)
   */
  put<T>(endpoint: string, body?: unknown): Promise<T> {
    return apiClient.request<T>(endpoint, { method: 'PUT', body });
  },

  /**
   * DELETE request.
   * @param endpoint - API endpoint
   */
  delete<T>(endpoint: string): Promise<T> {
    return apiClient.request<T>(endpoint, { method: 'DELETE' });
  },

  /**
   * PATCH request.
   * @param endpoint - API endpoint
   * @param body - Request body (will be JSON.stringify'd)
   */
  patch<T>(endpoint: string, body?: unknown): Promise<T> {
    return apiClient.request<T>(endpoint, { method: 'PATCH', body });
  },

  /**
   * Upload file via multipart/form-data.
   * @param endpoint - API endpoint
   * @param file - File to upload
   * @param fieldName - Form field name (default: 'file')
   */
  upload<T>(endpoint: string, file: File, fieldName = 'file'): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);
    return apiClient.request<T>(endpoint, { method: 'POST', body: formData });
  },

  /**
   * Download file as Blob.
   * @param endpoint - API endpoint
   * @param timeout - Request timeout in milliseconds (default: 60000 for downloads)
   * @returns Promise with Blob
   */
  async download(endpoint: string, timeout = 60000): Promise<Blob> {
    const url = `${config.apiProxyBaseUrl}${endpoint}`;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] GET (download) ${endpoint}`);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    let response: Response;
    try {
      response = await fetch(url, { signal: controller.signal });
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError(408, 'Request Timeout', { message: `Download timed out after ${timeout}ms` });
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }

    return response.blob();
  },
};
