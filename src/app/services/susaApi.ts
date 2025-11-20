// services/susaApi.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// This service is now designed for **Client Components** // that pass the token obtained via getAccessTokenSilently().
// If you must use it in a Server Component or Route Handler, 
// the token acquisition logic must be moved here or abstracted further.

export const susaApi = (token: string) => {
  if (!API_BASE_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  const headers = { Authorization: `Bearer ${token}` };
  const jsonHeaders = { ...headers, 'Content-Type': 'application/json' };

  return {
    // --- Project List: Use the secure Next.js Route Handler for this protected endpoint ---
    getProjects: async () => {
        // We will call the Next.js Route Handler you provided (`/api/projects` or similar)
        // instead of calling the backend directly from the client.
        const res = await fetch('/api/projects', { 
            // NOTE: You don't need to pass the token here if the handler handles it. 
            // If you choose to keep this structure, the handler needs to be generic. 
            // FOR SIMPLICITY AND DIRECT PORTING, we will keep the token flow for all calls 
            // except for the first `getProjects` if you choose to use the handler as-is.
        });
        if (!res.ok) {
             const error = await res.json().catch(() => ({ error: 'Failed to fetch projects' }));
             throw new Error(error.error || 'Failed to fetch projects');
        }
        return res.json();
    },

    uploadFile: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE_URL}/susa/upload`, {
        method: "POST",
        headers, // Includes token
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      return res.json();
    },

    getProjectDetails: async (id: number | string) => {
      const res = await fetch(`${API_BASE_URL}/susa/${id}`, { headers });
      if (!res.ok) throw new Error('Failed to fetch details');
      return res.json();
    },

    preAnalyze: async (id: number | string) => {
      const res = await fetch(`${API_BASE_URL}/susa/${id}/pre-analyze`, {
        method: 'POST',
        headers
      });
      if (!res.ok) throw new Error('Pre-analysis failed');
      return res.json();
    },

    startAnalysis: async (id: number | string, mappings: Record<string, string>) => {
      const res = await fetch(`${API_BASE_URL}/susa/${id}/analyze`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ mappings })
      });
      // 202 means queued, 200 means cached result returned immediately
      if (res.status !== 200 && res.status !== 202) throw new Error('Analysis failed');
      return res.json(); 
    },

    deleteProject: async (id: number | string) => {
      await fetch(`${API_BASE_URL}/susa/${id}`, { method: 'DELETE', headers });
    },
    
    downloadFile: async (taskId: string, fileName: string) => {
        // The file download URL needs the base URL
        const downloadUrl = `${API_BASE_URL}/susa/download-result/${taskId}/${fileName}`;

        const res = await fetch(downloadUrl, { headers });
        if (!res.ok) throw new Error('Download failed');
        return res.blob();
    }
  };
};