import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex bg-[#f9fafb] dark:bg-[#0b0b12]">
        {/* Sidebar */}
        <aside className="w-64 fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          <Sidebar />
        </aside>

        {/* Main content shifted right */}
        <div className="flex flex-col flex-1 ml-64">
          <Topbar />
          <main className="flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-8 bg-[#f9fafb] dark:bg-[#0b0b12]">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
