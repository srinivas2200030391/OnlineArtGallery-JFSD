import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopNavbar = () => {
  const [username, setUsername] = useState("Guest");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.user?.username || "Guest");
        setUserEmail(parsedUser.user?.email || "");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    // refresh window
    window.location.reload();
  };

  const handleProfileNavigate = () => {
    navigate("/profile");
  };

  const handleSettingsNavigate = () => {
    navigate("/settings");
  };

  return (
    <nav className="w-full px-6 py-4 shadow-lg flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
            <Avatar className="mr-3">
              <AvatarImage src="/api/placeholder/40/40" alt={username} />
              <AvatarFallback>
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{username}</span>
              <span className="text-xs text-gray-500">{userEmail}</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={handleProfileNavigate}
            className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={handleSettingsNavigate}
            className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={handleLogout}
            className="text-red-500 cursor-pointer focus:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default TopNavbar;
