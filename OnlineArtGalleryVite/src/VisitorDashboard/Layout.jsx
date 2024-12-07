import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SimilarComponents/SideNavBar";
import Navbar from "../SimilarComponents/TopNavBar";

const Layout = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="w-64 shrink-0">
        {" "}
        {/* Fixed width sidebar container */}
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
