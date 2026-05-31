import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiHome,
  FiImage,
  FiBarChart2,
  FiAward,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";
import Logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useContext(AuthContext);

  const handleLogin = () => {
    setOpen(false);
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "HOME", path: "/", icon: <FiHome /> },
    { name: "PLAYERS", path: "/players", icon: <FiUsers /> },
    { name: "MATCHES", path: "/matches", icon: <FiCalendar /> },
    { name: "LEADERBOARD", path: "/leaderboard", icon: <FiAward /> },
    { name: "STATS", path: "/stats", icon: <FiBarChart2 /> },
    { name: "GALLERY", path: "/gallery", icon: <FiImage /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* GLASS NAVBAR */}
      <div className="backdrop-blur-xl bg-[#071427]/80 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={Logo}
              className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-110 transition"
              alt="logo"
            />
            <div className="leading-tight">
              <h1 className="text-white font-black tracking-widest text-sm sm:text-base">
                AURA <span className="text-amber-400">CRICKET</span>
              </h1>
              <p className="text-[10px] text-gray-400 tracking-widest">
                ONE TEAM • ONE DREAM
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300
                  ${
                    isActive(link.path)
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                      : "text-gray-300 hover:text-amber-400 hover:bg-white/5"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* AUTH SECTION */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-amber-500/20">
                  <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-black font-black">
                    {user?.name?.charAt(0) || "P"}
                  </div>
                  <span className="text-xs text-white font-semibold max-w-[120px] truncate">
                    {user?.name || "Player"}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition text-xs font-bold"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-xs hover:scale-105 transition shadow-lg shadow-amber-500/20"
              >
                <FiUser />
                LOGIN
              </button>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl"
          >
            {open ? <FiX className="text-amber-400" /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU (SLIDE STYLE) */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[78%] bg-[#071427] border-l border-amber-500/20 shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-amber-400 font-black tracking-widest">
              MENU
            </h2>
            <button onClick={() => setOpen(false)}>
              <FiX className="text-white text-xl" />
            </button>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition
                ${
                  isActive(link.path)
                    ? "bg-amber-500 text-black"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* AUTH */}
          <div className="mt-auto pt-6 border-t border-white/10">
            {user ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500 text-black rounded-full flex items-center justify-center font-black">
                    {user?.name?.charAt(0) || "P"}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">
                      {user?.name || "Player"}
                    </p>
                    <p className="text-xs text-amber-400">SQUAD MEMBER</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-500 text-white font-bold flex items-center justify-center gap-2"
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full py-3 rounded-xl bg-amber-500 text-black font-black flex items-center justify-center gap-2"
              >
                <FiUser />
                LOGIN
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;