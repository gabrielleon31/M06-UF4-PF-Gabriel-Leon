export const experimental_ppr = true
import SideNav from '@/app/ui/dashboard/sidenav';

export default function DashboardLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen md:flex-row flex-col">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <SideNav />
      </div>
      {/* Main content */}
      <div className="flex-grow p-6 md:p-12 overflow-auto">
        {children}
      </div>
    </div>
  );
}
