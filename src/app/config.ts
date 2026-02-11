// src/config.ts

// These constants are used by the client-side for displaying information,
// but the actual Auth0 connection is handled securely via environment variables
// and the Next.js middleware/proxy setup.

export const config = {
    // This is the URL base for the NEXT.JS API proxy, not the direct backend
    apiProxyBaseUrl: '/api/proxy',

    // Viewer settings mock
    viewer: {
        initialCamera: { x: 0, y: 0, z: 10 },
    },

    // Trame VTK Remote Rendering
    trame: {
        // This URL is returned from the backend session endpoint
        // Fallback for development: http://localhost:8081
        defaultUrl: process.env.NEXT_PUBLIC_TRAME_URL || 'http://localhost:8081',
    },
};