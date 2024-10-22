import { SidebarDemo } from "@/app/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SidebarDemo />

      <main className="flex-1 bg-gray-100 p-4">{children}</main>
    </div>
  );
}
