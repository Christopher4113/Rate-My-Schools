import { useState } from "react";
import { useNavigate, useLocation, Link} from "react-router-dom";
import Option from "../ui/option";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  sub: string; // usually the email or username
  exp: number;
  isAdmin?: boolean;
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const token = sessionStorage.getItem('token');
  const isDashboard = location.pathname === "/dashboard";
  const login = location.pathname === "/login";
  const signup = location.pathname === "/signup";
  const forgot = location.pathname === "/forgot";
  const leaderboard = location.pathname === "/leaderboard";
  let isAdmin: boolean = false;
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      isAdmin = decoded.isAdmin ?? false;
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setSidebarOpen(false);
    navigate("/dashboard");
  };

  const handleMenu = () => {
    setSidebarOpen(false);
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    setSidebarOpen(false);
    navigate(-1); // This navigates to the previous page in history
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`relative w-full h-16 flex items-center justify-between px-5 shadow-sm z-50 
                 max-sm:h-14 max-sm:px-3 ${isDashboard ? "bg-blue-600" : "bg-blue-500"}`}
    >
      {/* Sidebar toggle on the left */}
      <div className="flex items-center -mt-6 max-sm:-ml-8 z-10">
        <Option onClick={toggleSidebar} />
      </div>

      {/* Centered title using absolute + transform */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-semibold text-3xl max-sm:text-xl">
        RateMySchools
      </div>

      {/* Empty placeholder div to balance layout */}
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

          {/* Go Back Button - only show if not on dashboard */}
          {!isDashboard && !login && !signup && !forgot &&  (
            <button
              onClick={handleGoBack}
              className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 rounded font-semibold shadow-lg hover:shadow-xl transition"
            >
              Go Back
            </button>
          )}


          {/* Menu Button - only show if not already on dashboard */}
          {!isDashboard && (
            <button
              onClick={handleMenu}
              className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 rounded font-semibold shadow-lg hover:shadow-xl transition mt-3"
            >
              Menu
            </button>
          )}

          {/* Logout Button */}
          {token && (
            <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-2 rounded font-semibold shadow-lg hover:shadow-xl transition"
            >
              Logout
            </button>
          )}
          {token && (
            <Link to="/profile" className="text-white bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-2 rounded font-semibold shadow-lg hover:shadow-xl transition text-center">
              Profile
            </Link>
          )}
          {!token && (
            <Link to="/login" className=" text-white bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 rounded font-semibold shadow-lg hover:shadow-xl transition text-center">
              Login
            </Link>
          )}
          {!token && (
            <Link to="/signup" className="text-white bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 rounded font-semibold shadow-lg hover:shadow-xl transition text-center">
              Register
            </Link>
          )}
          {token && isAdmin && isDashboard&& (
            <Link
              to="/admin"
              className="text-white bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-2 rounded font-semibold shadow-lg hover:shadow-xl transition text-center"
            >
              Admin
            </Link>
          )}
        {!leaderboard && (
          <Link
          to='/leaderboard'
          className="text-white bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-2 rounded font-semibold shadow-lg hover:shadow-xl transition text-center"
          >
            Leader Boards
          </Link>
        )}
        </div>
      )}
    </div>
  );
};

export default Header;