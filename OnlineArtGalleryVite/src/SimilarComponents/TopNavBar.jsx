import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the username from localStorage
    const storedUsername = localStorage.getItem("user");
    const jsonParser = JSON.parse(storedUsername);
    setUsername(jsonParser.user.username|| "Guest");
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="w-full px-6 py-4 shadow-lg flex justify-end">
      {/* Username and Logout */}
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold">Hi, {username}!</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
