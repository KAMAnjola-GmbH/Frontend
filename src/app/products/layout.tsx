// /app/products/layout.tsx

import Sidebar from '@/app/components/ui/Sidebar'; // Assuming the path is correct
import { SusaProjectProvider } from '@/app/context/SusaProjectContext'; // Context is not used in the final version, using hooks instead

export default function Layout({ children }: { children: React.ReactNode }) {
  // This layout assumes its parent (RootLayout's <div>) is already controlling the height (h-full).
  return (
    <SusaProjectProvider>

    // Make this container span the full height of its parent (the flex-grow wrapper in RootLayout)
      <div className="flex w-full h-full">

        {/* Left Column: Sidebar (fixed width, full height) */}
        {/* Note: The Sidebar component handles its own content (project list, upload form) */}
        <div className="w-64 flex-none h-full overflow-y-auto">
          <Sidebar />
        </div>

        {/* Right Column: Main Content (grows to fill remaining space) */}
        <div className="flex-grow h-full overflow-y-auto">
          {children}
        </div>

      </div>
    </SusaProjectProvider>
  );
}