import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const PlayerLayout = ({ children }) => {
  const { logout, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Players", path: "/players" },
    { name: "Leaderboard", path: "/players/leaderboard" },
    { name: "Stats", path: "/players/stats" },
    { name: "Gallery", path: "/gallery" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#f4f6fb]">
      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:fixed top-0 left-0 h-screen w-64
          bg-gradient-to-b from-[#0b1220] via-[#0a0f1c] to-[#050814]
          text-white flex flex-col justify-between
          p-5 z-40 shadow-2xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* LOGO */}
        <div>
          <h2 className="text-xl font-bold tracking-wide mb-10 text-white/90">
            🏏 Cricket App
          </h2>

          {/* MENU */}
          <ul className="space-y-2">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`
                      relative flex items-center px-4 py-3 rounded-xl
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-white text-black font-semibold shadow-lg"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    {/* ACTIVE INDICATOR BAR */}
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-blue-400 rounded-full" />
                    )}

                    <span className="text-sm tracking-wide">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* FOOTER / USER */}
        <div className="border-t border-white/10 pt-4">
          <div className="mb-4">
            <p className="text-sm text-gray-300 font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">Player Account</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500/90 hover:bg-red-600
            transition-all duration-200 text-white py-2 rounded-xl
            font-medium shadow-md"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN AREA */}
      <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
        {/* TOP NAVBAR */}
        <div
          className="
          bg-white/80 backdrop-blur-md
          border-b border-gray-200
          px-6 py-1 flex justify-between items-center
          sticky top-0 z-20
          shadow-sm
        "
        >
          {/* MOBILE MENU */}
          <button
            className="md:hidden text-xl text-gray-700"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          {/* CENTER LOGO */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src={Logo}
              alt="Logo"
              className="h-10 object-contain rounded-full"
            />
          </div>

          <h1 className="font-semibold text-gray-800 text-lg tracking-wide">
            Player Dashboard
          </h1>

          {/* PROFILE */}
          <div className="flex items-center gap-3">
            <div
              className="
              w-9 h-9 rounded-full
              bg-gradient-to-tr from-blue-500 to-indigo-500
              shadow-md
            "
            />

            <span className="text-sm font-medium text-gray-700">Player</span>
          </div>
        </div>

        {/* CONTENT */}
        <main className="p-6 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default PlayerLayout;
