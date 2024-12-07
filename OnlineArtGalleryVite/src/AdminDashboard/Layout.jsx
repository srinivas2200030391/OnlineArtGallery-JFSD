import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SimilarComponents/SideNavBar";
import Navbar from "../SimilarComponents/TopNavBar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Content */}
        <div className="flex-1 p-6 bg-gray-100 flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
