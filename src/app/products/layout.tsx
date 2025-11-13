import Sidebar from '@/app/ui/components/Sidebar'; // Import new Navbar component
import { Auth0Provider } from '@auth0/nextjs-auth0/client';
import { SignalRProvider } from '@/app/ui/components/providers/SignalRProvider';
import { ProjectProvider } from '@/app/context/ProjectContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProjectProvider> {/* Manages project list */}
      <SignalRProvider> {/* Manages SignalR connection */}
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <Sidebar />
          <div className="w-full flex-none md:w-64">
          </div>
          <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
      </SignalRProvider>
    </ProjectProvider>
  );
}