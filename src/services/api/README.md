# API Services

Centralized API layer for all microservice communication.

## Architecture

```
src/services/api/
├── client.ts      # Base HTTP client (apiClient)
├── susa.ts        # SUSA financial analysis API
├── index.ts       # Central exports
└── README.md      # This file
```

## Usage

```typescript
import { susaApi, ApiError } from '@/services/api';

// Get projects
const projects = await susaApi.getProjects();

// Handle errors
try {
  await susaApi.deleteProject(id);
} catch (error) {
  if (error instanceof ApiError && error.isUnauthorized()) {
    // Redirect to login
  }
}
```

## Adding a New Microservice

1. Create `src/services/api/{service}.ts`:

```typescript
import { apiClient } from './client';
import type { YourType } from '@/types/{service}';

const BASE = '/{service}';

export const {service}Api = {
  getItems(): Promise<YourType[]> {
    return apiClient.get<YourType[]>(BASE);
  },

  getItem(id: number): Promise<YourType> {
    return apiClient.get<YourType>(`${BASE}/${id}`);
  },

  createItem(data: CreateData): Promise<YourType> {
    return apiClient.post<YourType>(BASE, data);
  },

  updateItem(id: number, data: UpdateData): Promise<YourType> {
    return apiClient.put<YourType>(`${BASE}/${id}`, data);
  },

  deleteItem(id: number): Promise<void> {
    return apiClient.delete<void>(`${BASE}/${id}`);
  },

  uploadFile(file: File): Promise<UploadResponse> {
    return apiClient.upload<UploadResponse>(`${BASE}/upload`, file);
  },
};
```

2. Export from `src/services/api/index.ts`:

```typescript
export { {service}Api } from './{service}';
```

3. Create types in `src/types/{service}.ts`

4. Create hook `src/hooks/use{Service}.ts` if needed

## Base Client Methods

| Method | Description |
|--------|-------------|
| `apiClient.get<T>(endpoint)` | GET request |
| `apiClient.post<T>(endpoint, body?)` | POST request |
| `apiClient.put<T>(endpoint, body?)` | PUT request |
| `apiClient.patch<T>(endpoint, body?)` | PATCH request |
| `apiClient.delete<T>(endpoint)` | DELETE request |
| `apiClient.upload<T>(endpoint, file, fieldName?)` | File upload (multipart/form-data) |
| `apiClient.download(endpoint)` | Download file as Blob |

## Error Handling

```typescript
import { ApiError } from '@/services/api';

try {
  await susaApi.getProject(id);
} catch (error) {
  if (error instanceof ApiError) {
    if (error.isUnauthorized()) {
      // 401 - redirect to login
    }
    if (error.isNotFound()) {
      // 404 - show not found
    }
    if (error.is(422)) {
      // Validation error
      console.log(error.data); // Response body
    }
  }
}
```

## Planned Microservices

| Service | File | Description |
|---------|------|-------------|
| SUSA | `susa.ts` | Financial analysis (implemented) |
| Projects | `projects.ts` | 3D model management |
| Simulations | `simulations.ts` | FEM/stress analysis |
| Admin | `admin.ts` | User management |
| Workshops | `workshops.ts` | Training/workshops |
