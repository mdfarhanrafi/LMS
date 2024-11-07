"use client";
import { AuthContext } from "@/context/auth-context";
import { BarChart, Book, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tabs } from "../ui/tabs";
import Link from "next/link";
const SideNav = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { logout } = useContext(AuthContext);
  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "/instructor/dashboard",
    },
    {
      icon: Book,
      label: "Courses",
      value: "/instructor/courses",
    },
  ];
  function handleLogout() {
    logout();
  }

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
          <nav>
            {menuItems.map((menuItem) => (
              <Link href={menuItem.value} key={menuItem.value}>
                <Button
                  className="w-full justify-start mb-2"
                  key={menuItem.value}
                  variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                  onClick={() => setActiveTab(menuItem.value)}
                >
                  <menuItem.icon className="mr-2 h-4 w-4" />
                  {menuItem.label}
                </Button>
              </Link>
            ))}

            <Button
              className="w-full justify-start mb-2"
              variant={"ghost"}
              onClick={handleLogout}
            >
              <LogOut />
              Logout
            </Button>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
