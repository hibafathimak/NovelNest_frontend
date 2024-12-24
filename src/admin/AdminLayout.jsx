import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";


const AdminLayout = () => {
  return (
    <main className="flex bg-primary text-[#404040] min-h-screen">


      <Sidebar />

      <div className="flex-1 flex flex-col transition-all duration-300 ml-20 sm:ml-64">
        <div className="flex-1 bg-primary overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
