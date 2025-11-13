'use client';

import { useEffect, useState } from 'react';
import { useUser, getAccessToken } from '@auth0/nextjs-auth0/client';

interface Project {
  id: number;
  name: string;
  uploadedAt: string;
}

export default function ProjectsPage() {
  const { user, error: userError, isLoading } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
  if (!user) return;
  setLoadingProjects(true);
  setApiError(null);

  try {
    const res = await fetch('/api/projects', { credentials: 'include' });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch projects: HTTP ${res.status} (${text})`);
    }

    const data = await res.json();
    setProjects(data);
  } catch (err: any) {
    setApiError(err.message);
  } finally {
    setLoadingProjects(false);
  }
}

    fetchProjects();
  }, [user]);

  // --- UI rendering ---
  if (isLoading) return <div style={{ padding: '2rem' }}>Loading user...</div>;

  if (userError) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <p>Error loading user: {userError.message}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <p>
          Please <a href="/auth/login">Login</a> to see your projects.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome, {user.name}</h1>
      <a href="/auth/logout">Logout</a>

      <h2 style={{ marginTop: '1.5rem' }}>Your Projects</h2>
      {loadingProjects && <p>Loading projects...</p>}
      {apiError && <p style={{ color: 'red' }}>Error: {apiError}</p>}
      {projects.length === 0 && !apiError && !loadingProjects && <p>No projects yet.</p>}

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            {p.name} – {new Date(p.uploadedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
