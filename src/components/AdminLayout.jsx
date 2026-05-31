import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const AdminLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Admin Menu
  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Players", path: "/admin/players" },
    { name: "Matches", path: "/admin/matches" },
    { name: "Gallery", path: "/admin/gallery" },
  ];

  // Player/User Menu
  const playerMenu = [
    { name: "My Profile", path: "/player/profile" },
    { name: "My Matches", path: "/player/matches" },
    { name: "Attendance", path: "/player/attendance" },
  ];

  // Role-based menu selection
  const menuItems = user?.role === "admin" ? adminMenu : playerMenu;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-gray-300 text-black p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Cricket App</h2>

        <button onClick={() => setSidebarOpen(true)}>
          <FaBars size={22} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
                    fixed top-0 left-0 h-full w-64 bg-black text-white p-5 z-50
                    flex flex-col transform transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
      >
        {/* Mobile Close */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold">Menu</h2>

          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes size={22} />
          </button>
        </div>

        {/* Desktop Title */}
        <h2 className="text-2xl font-bold mb-6 hidden md:block">
          Cricket Admin
        </h2>

        {/* Dynamic Menu */}
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded transition ${
                    isActive
                      ? "bg-green-600 text-white font-semibold"
                      : "text-gray-300 hover:bg-gray-800"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* MOBILE USER INFO + LOGOUT */}
        <div className="mt-auto md:hidden">
          <div className="border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400 mb-3">{user?.name}</p>

            <button
              onClick={() => {
                logout();
                setSidebarOpen(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 p-6">
        {/* Desktop Navbar */}
        <div className="hidden md:flex bg-white p-4 rounded shadow mb-6 justify-between items-center">
          <h2 className="text-xl font-bold">Welcome, {user?.name}</h2>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2"
            >
              <FaUserCircle size={28} />
              <span>{user?.name}</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded p-4 z-50">
                <h3 className="font-bold">{user?.name}</h3>

                <p className="text-sm text-gray-500 mb-3">Role: {user?.role}</p>

                <button
                  onClick={logout}
                  className="w-full bg-red-500 text-white py-2 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Content */}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
