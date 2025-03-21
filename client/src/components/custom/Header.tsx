import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Option from "../ui/option";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const isDashboard = location.pathname === "/dashboard";
  const isSchool = location.pathname === "/school";

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setSidebarOpen(false);
    navigate("/login");
  };

  const handleMenu = () => {
    setSidebarOpen(false);
    navigate("/dashboard");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`relative w-full h-16 flex items-center justify-between px-5 shadow-sm z-50 
                 max-sm:h-14 max-sm:px-3 ${isDashboard ? "bg-blue-600" : "bg-blue-500"}`}
    >
      {/* Option Button */}
      <div className="flex items-center -mt-6 max-sm:-ml-8">
        <Option onClick={toggleSidebar} />
      </div>

      {/* Main Title */}
      <div className="text-center text-white font-semibold text-3xl max-sm:text-xl">
        RateMySchools
      </div>

      {/* Spacer to balance alignment */}
      <div className="w-[44px]"></div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="absolute top-0 right-0 h-screen w-64 bg-gray-800 text-white shadow-lg z-50 flex flex-col p-5 space-y-5">
          {/* Close Sidebar Button */}
          <button
            onClick={toggleSidebar}
            className="self-end text-gray-400 hover:text-white"
          >
            ✖
          </button>


          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-2 rounded font-semibold shadow-lg hover:shadow-xl transition"
          >
            Logout
          </button>

          {/* Menu Button - only show if not already on dashboard */}
          {!isDashboard && (
            <button
              onClick={handleMenu}
              className="bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-2 rounded font-semibold shadow-lg hover:shadow-xl transition"
            >
              Menu
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;