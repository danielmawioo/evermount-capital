import Sidebar from "@/app/components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#f9fafb] dark:bg-gray-950">
      {/* Sidebar fixed */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-white dark:bg-gray-900 border-r z-50">
        <Sidebar />
      </aside>

      {/* Right Content */}
      <div className="flex flex-col flex-1 ml-64">
        <Topbar />
        <main className="flex-1 px-4 py-6 md:px-10 md:py-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
