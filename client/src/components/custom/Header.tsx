import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Option from '../ui/option';

const Header = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Clear sessionStorage
    navigate('/login'); // Redirect to login page
  };

  const handleMenu = () => {
    navigate('/dashboard');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="relative p-2 shadow-sm flex items-center justify-between px-5 max-sm:text-sm max-sm:scale-90 max-sm:space-2">
      {/* Option Button */}
      <div className="flex items-center -mt-6 max-sm:-ml-12">
        <Option onClick={toggleSidebar} />
      </div>

      {/* Main Title */}
      <div className="text-center text-gray-600 font-semibold text-4xl max-sm:text-2xl">
        RateMy
        <span className="text-blue-800">Schools</span>
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

          {/* Menu Button */}
          <button
            onClick={handleMenu}
            className="bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-2 rounded font-semibold shadow-lg hover:shadow-xl transition"
          >
            Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
