/**
 * API Services - Central export point.
 *
 * @example
 * import { susaApi, apiClient, ApiError } from '@/services/api';
 *
 * try {
 *   const projects = await susaApi.getProjects();
 * } catch (error) {
 *   if (error instanceof ApiError && error.isUnauthorized()) {
 *     // Handle unauthorized
 *   }
 * }
 */

// Base client and error class
export { apiClient, ApiError } from './client';

// Microservice APIs
export { susaApi } from './susa';

// Future microservices will be added here:
// export { projectsApi } from './projects';
// export { simulationsApi } from './simulations';
// export { adminApi } from './admin';
