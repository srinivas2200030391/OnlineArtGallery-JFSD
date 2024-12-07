import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const menuItemsByRole = {
  admin: [
    { label: "Dashboard", icon: "🏠", path: "/dashboard" },
    { label: "Manage Users", icon: "👥", path: "/manage-users" },
    { label: "Settings", icon: "⚙️", path: "/settings" },
    { label: "Reports", icon: "📊", path: "/reports" },
    { label: "Logs", icon: "📝", path: "/logs" },
    { label: "Notifications", icon: "🔔", path: "/notifications" },
    { label: "Help", icon: "❓", path: "/help" },
  ],
  artist: [
    { label: "Portfolio", icon: "🎨", path: "/portfolio" },
    { label: "Upload Art", icon: "⬆️", path: "/upload" },
    { label: "Gallery", icon: "🖼️", path: "/gallery" },
    { label: "Commissions", icon: "💰", path: "/commissions" },
    { label: "Analytics", icon: "📈", path: "/analytics" },
    { label: "Messages", icon: "✉️", path: "/messages" },
    { label: "Support", icon: "🛠️", path: "/support" },
  ],
  visitor: [
    { label: "Home", icon: "🏠", path: "/home" },
    { label: "Explore", icon: "🔍", path: "/explore" },
    { label: "Contact Us", icon: "📞", path: "/contact" },
    { label: "FAQ", icon: "❓", path: "/faq" },
    { label: "Feedback", icon: "💬", path: "/feedback" },
    { label: "Subscribe", icon: "📬", path: "/subscribe" },
    { label: "About Us", icon: "ℹ️", path: "/about" },
  ],
  curator: [
    { label: "Curate Art", icon: "📑", path: "/curate" },
    { label: "Collections", icon: "🗂️", path: "/collections" },
    { label: "Feedback", icon: "💬", path: "/feedback" },
    { label: "Submissions", icon: "📤", path: "/submissions" },
    { label: "Events", icon: "📅", path: "/events" },
    { label: "Collaborations", icon: "🤝", path: "/collaborations" },
    { label: "Profile", icon: "👤", path: "/profile" },
  ],
};

const Sidebar = () => {
  const [role, setRole] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const menuRef = useRef(null);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get role from localStorage
    const storedRole = localStorage.getItem("role");
    setRole(storedRole || "admin");
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      gsap.fromTo(
        menuRef.current.children,
        { opacity: 0, scale: 0, x: -20 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          stagger: 0.3,
          duration: 2,
          ease: "elastic.out(1, 0.5)",
        }
      );
    }
  });

  const handleToggleSidebar = () => {
    if (isSidebarVisible) {
      gsap.to(sidebarRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => setSidebarVisible(false),
      });
    } else {
      setSidebarVisible(true);
      gsap.fromTo(
        sidebarRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.5, ease: "power2.out" }
      );
    }
  };

  const menuItems = menuItemsByRole[role] || [];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={`absolute z-10 w-72 h-full bg-gradient-to-br bg-blue-50 text-gray-200 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}>
        {/* Logo */}
        <div className="px-6 py-8 text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            My<span className="text-indigo-500"> Profile</span>
          </h1>
        </div>

        {/* Menu */}
        <ul ref={menuRef} className="flex-1 space-y-4 px-6">
          {menuItems
            .slice(0, Math.ceil(menuItems.length / 2))
            .map((item, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg bg-black hover:bg-indigo-600 transition-all cursor-pointer shadow-lg"
                onClick={() => navigate(item.path)}>
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg font-semibold">{item.label}</span>
              </li>
            ))}

          {/* Divider */}
          <div className="border-t border-gray-600 my-4"></div>

          {menuItems
            .slice(Math.ceil(menuItems.length / 2))
            .map((item, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg bg-gray-700 hover:bg-indigo-600 transition-all cursor-pointer shadow-lg"
                onClick={() => navigate(item.path)}>
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg font-semibold">{item.label}</span>
              </li>
            ))}
        </ul>

        {/* Footer */}
        <div className="px-6 py-6 bg-blue-75 text-center">
          <p className="text-sm text-gray-400">&copy; 2024 IG Theatre</p>
        </div>
      </nav>

      {/* Toggle Button */}
      <button
        onClick={handleToggleSidebar}
        className="fixed top-5 left-5 z-20 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700">
        {isSidebarVisible ? "<<" : ">>"}
      </button>
    </div>
  );
};

export default Sidebar;
