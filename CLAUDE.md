# CLAUDE.md - Frontend (Next.js)

This file provides guidance to Claude Code when working with the r0sita Frontend.

## Tech Stack

- **Framework:** Next.js 15.2.3 (App Router)
- **React:** 19.2.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4.1.17
- **Auth:** @auth0/nextjs-auth0
- **Real-time:** @microsoft/signalr
- **Charts:** Chart.js + react-chartjs-2
- **Animations:** Framer Motion

## Project Structure

```
src/
├── app/
│   ├── api/proxy/[...path]/route.ts  # API proxy (adds Auth0 token)
│   ├── components/
│   │   ├── susa/                      # SuSa analysis components
│   │   │   ├── AnalysisReport.tsx     # KPI results + charts
│   │   │   ├── KpiTable.tsx           # Data table
│   │   │   ├── MappingInterface.tsx   # Account mapping UI
│   │   │   ├── MainContent.tsx        # Content router
│   │   │   ├── Sidebar.tsx            # Project list
│   │   │   ├── DownloadLinks.tsx      # PDF/CSV/Excel downloads
│   │   │   └── charts/
│   │   │       ├── KostenstrukturChart.tsx
│   │   │       ├── KostenstrukturCategoryChart.tsx
│   │   │       └── FinanzUebersichtChart.tsx
│   │   └── ui/
│   │       ├── navigation/            # Navbar, AuthArea, etc.
│   │       ├── modals/                # Delete, Rename modals
│   │       ├── GenericSidebar.tsx
│   │       ├── ProjectList.tsx
│   │       └── Footer.tsx
│   ├── context/
│   │   ├── SusaProjectContext.tsx     # SuSa state provider
│   │   ├── SignalRContext.tsx         # SignalR provider
│   │   └── ProjectContext.tsx         # 3D projects (future)
│   ├── products/
│   │   └── susa/
│   │       ├── layout.tsx             # SuSa layout with sidebar
│   │       └── page.tsx               # Main SuSa page
│   ├── services/
│   │   └── susaApi.ts                 # Legacy API client
│   ├── config.ts                      # App configuration
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Home page
├── hooks/
│   ├── useSusaProjects.ts             # Core SuSa state management
│   ├── useSignalR.ts                  # SignalR connection
│   └── useNotifications.ts            # Toast notifications
├── lib/
│   └── auth0.ts                       # Auth0 configuration
├── types/
│   ├── susa.ts                        # SuSa TypeScript interfaces
│   └── index.ts                       # Shared types
├── components/                         # Legacy/shared components
│   ├── LoginButton.tsx
│   ├── LogoutButton.tsx
│   └── Profile.tsx
└── middleware.ts                       # Auth0 middleware
```

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Run production build
npm run lint         # ESLint checks
```

## Key Files

### State Management

**`hooks/useSusaProjects.ts`** - Core hook managing all SuSa state:
- Projects list
- Current project selection
- Analysis results
- Mapping data
- SignalR updates

**`context/SusaProjectContext.tsx`** - Provides `useSusaProjects` to component tree.

### API Communication

**`app/api/proxy/[...path]/route.ts`** - Secure API proxy:
- Fetches Auth0 access token server-side
- Forwards requests to backend with Bearer token
- Handles all HTTP methods (GET, POST, PUT, DELETE, PATCH)

**`config.ts`** - API base URL configuration:
```typescript
export const config = {
    apiProxyBaseUrl: '/api/proxy',  // All API calls go through this
};
```

### Real-time Updates

**`hooks/useSignalR.ts`** - SignalR connection hook:
- Connects to `/simulationHub`
- Listens for `JobUpdate` events
- Uses callback ref pattern for stable listeners

### Types

**`types/susa.ts`** - Key interfaces:
```typescript
type ProjectStatus =
    | 'Ready for Mapping'
    | 'Mapping in Progress'
    | 'Completed'
    | 'Failed'
    | 'Queued'
    | 'Processing';

interface SusaProject {
    id: number;
    originalFileName: string;
    uploadedAt: string;
    status: ProjectStatus;
}

interface PreAnalysisResult {
    unmappedAccounts: UnmappedAccount[];
    availableCategories: string[];
}

interface AnalysisResult {
    reportTitle: string;
    kpiResults: KpiRow[];
    resultFiles: ResultFiles;
}
```

## Authentication Flow

1. User visits protected page
2. `middleware.ts` checks Auth0 session
3. If not logged in → redirect to Auth0
4. After login → session cookie set
5. API calls go through `/api/proxy/[...path]`
6. Proxy fetches access token from Auth0
7. Proxy forwards request with Bearer token

## Analysis Flow (UI Perspective)

```
1. User uploads Excel file
   └─> Sidebar shows new project with status "Ready for Mapping"

2. User clicks project
   └─> selectProject() called
   └─> If "Ready for Mapping" → performPreAnalysis()
   └─> MappingInterface.tsx rendered

3. User maps accounts and clicks "Save & Run Analysis"
   └─> saveMappingsAndRunAnalysis()
   └─> Status changes to "Queued"
   └─> Spinner shown in MainContent.tsx

4. SignalR receives "JobUpdate" with status "Completed"
   └─> handleJobUpdate() called
   └─> fetchAnalysisResults()
   └─> AnalysisReport.tsx rendered with KPIs and charts
```

## Environment Variables

Create `.env.local`:
```
# API URLs
NEXT_PUBLIC_API_URL=http://localhost:5256/api
NEXT_PUBLIC_SIGNALR_URL=http://localhost:5256

# Auth0 (required)
AUTH0_SECRET=<random-32-char-string>
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://<your-tenant>.auth0.com
AUTH0_CLIENT_ID=<your-client-id>
AUTH0_CLIENT_SECRET=<your-client-secret>
AUTH0_AUDIENCE=<your-api-identifier>
```

## Known Issues

### Critical - Fix Now
1. **`route.ts:47`** - Remove `console.log(accessToken)` (security leak)
2. **`useSusaProjects.ts:48-56`** - Duplicate useEffect (lines 48-50 identical to 54-56)
3. **`KpiTable.tsx:9`** - Duplicate type: `number |string | number`

### Medium Priority
4. **`susa/page.tsx:31`** - Uses `as any` cast, fix proper typing
5. **`susaApi.ts:73-75`** - `deleteProject` doesn't check `response.ok`

## Patterns & Conventions

### Component Structure
- Use `'use client'` directive for client components
- Keep components small and focused
- Use custom hooks for shared logic

### State Management
- Use React Context for global state
- Use hooks for encapsulated logic
- Avoid prop drilling with context

### Styling
- Use Tailwind CSS utility classes
- Dark theme with gray-800/900 backgrounds
- Consistent spacing (p-4, p-6, gap-6)

### Error Handling
- Use try/catch with specific error messages
- Show user-friendly notifications via `useNotifications`
- Log detailed errors to console

## Features NOT Yet Implemented

From old_frontend reference:
- 3D Model Viewer (Three.js)
- Stress Simulation
- i18n / Internationalization
- ParaView Integration

## Testing

Currently no frontend tests. Consider adding:
- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright
