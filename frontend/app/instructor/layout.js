"use client"
import SideNav from "@/components/instructor/sideNav";
import ProtectedRoute  from "@/context/protected";
export default function RootLayout({ children }) {
  return (
    <ProtectedRoute>
  
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">  
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
    </div>

    </ProtectedRoute>
  );
}
