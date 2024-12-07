import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Menu, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItemsByRole = {
  admin: [
    { label: "Dashboard", icon: "dashboard", path: "/dashboard" },
    { label: "Manage Users", icon: "users", path: "/manage-users" },
    { label: "Settings", icon: "settings", path: "/settings" },
    { label: "Reports", icon: "bar-chart", path: "/reports" },
    { label: "Logs", icon: "file-text", path: "/logs" },
    { label: "Notifications", icon: "bell", path: "/notifications" },
    { label: "Help", icon: "help-circle", path: "/help" },
  ],
  artist: [
    { label: "Portfolio", icon: "palette", path: "/portfolio" },
    { label: "Upload Art", icon: "upload", path: "/upload" },
    { label: "Gallery", icon: "image", path: "/gallery" },
    { label: "Commissions", icon: "wallet", path: "/commissions" },
    { label: "Analytics", icon: "trending-up", path: "/analytics" },
    { label: "Messages", icon: "mail", path: "/messages" },
    { label: "Support", icon: "tool", path: "/support" },
  ],
  visitor: [
    { label: "Home", icon: "home", path: "/" },
    { label: "Explore", icon: "search", path: "/explore" },
    { label: "Contact", icon: "phone", path: "/contact" },
    { label: "FAQ", icon: "help-circle", path: "/faq" },
    { label: "Feedback", icon: "message-circle", path: "/feedback" },
    { label: "Subscribe", icon: "mail", path: "/subscribe" },
    { label: "About", icon: "info", path: "/about" },
  ],
  curator: [
    { label: "Curate Art", icon: "clipboard", path: "/curate" },
    { label: "Collections", icon: "folder", path: "/collections" },
    { label: "Feedback", icon: "message-circle", path: "/feedback" },
    { label: "Submissions", icon: "send", path: "/submissions" },
    { label: "Events", icon: "calendar", path: "/events" },
    { label: "Collaborations", icon: "users", path: "/collaborations" },
    { label: "Profile", icon: "user", path: "/profile" },
  ],
};

const Sidebar = () => {
  const [role, setRole] = useState("admin");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("user");
    const jsonParse = JSON.parse(storedRole);
    console.log(jsonParse.role);
    
    setRole(jsonParse.role.toLowerCase()|| "admin");
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  const menuItems = menuItemsByRole[role] || [];

  return (
    <div
      className={`
      fixed left-0 top-0 h-full 
      bg-white shadow-lg 
      transition-all duration-300 
      ${isSidebarCollapsed ? "w-20" : "w-64"}
    `}>
      {/* Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 -right-4 z-50 
        bg-blue-500 text-white p-2 rounded-full 
        shadow-lg hover:bg-blue-600 transition">
        {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>

      {/* User Dropdown */}
      <div className="p-4 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center w-full">
            <img
              src="/img/about.jpg"
              alt="User"
              className="w-10 h-10 rounded-full mr-3"
            />
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-sm">John Doe</span>
                <span className="text-xs text-gray-500 capitalize">Admin</span>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleNavigate("/profile")}
              className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleNavigate("/settings")}
              className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                localStorage.clear();
                handleNavigate("/");
              }}
              className="text-red-500 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Menu Items */}
      <nav className="mt-4 overflow-y-auto h-[calc(100%-150px)]">
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigate(item.path)}
              className={`
                flex items-center p-3 
                hover:bg-blue-50 cursor-pointer 
                ${isSidebarCollapsed ? "justify-center" : "px-4"}
              `}>
              <div className="flex items-center">
                {renderIcon(item.icon)}
                {!isSidebarCollapsed && (
                  <span className="ml-3 text-sm">{item.label}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!isSidebarCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-xs text-gray-500">
          © 2024 IG Theatre
        </div>
      )}
    </div>
  );
};

// Simulated Icons import (replace with actual import from lucide-react or your icon library)
const Icons = {
  dashboard: Menu,
  users: Menu,
  settings: Menu,
  "bar-chart": Menu,
  "file-text": Menu,
  bell: Menu,
  "help-circle": Menu,
  palette: Menu,
  upload: Menu,
  image: Menu,
  wallet: Menu,
  "trending-up": Menu,
  mail: Menu,
  tool: Menu,
  home: Menu,
  search: Menu,
  phone: Menu,
  "message-circle": Menu,
  clipboard: Menu,
  folder: Menu,
  send: Menu,
  calendar: Menu,
  user: Menu,
  info: Menu,
};

export default Sidebar;
