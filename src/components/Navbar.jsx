import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

  const navLinks = [
    { name: "HOME", path: "/", icon: <FiHome /> },
    { name: "PLAYERS", path: "/players", icon: <FiUsers /> },
    { name: "MATCHES", path: "/matches", icon: <FiCalendar /> },
    { name: "LEADERBOARD", path: "/leaderboard", icon: <FiAward /> },
    { name: "STATS", path: "/stats", icon: <FiBarChart2 /> },
    { name: "GALLERY", path: "/gallery", icon: <FiImage /> },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogin = () => {
    setOpen(false);
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* TOP BAR */}
      <div className="backdrop-blur-xl bg-[#071427]/80 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} className="w-10 h-10" alt="logo" />
            <div>
              <h1 className="text-white font-black text-sm">
                AURA <span className="text-amber-400">CRICKET</span>
              </h1>
              <p className="text-[10px] text-gray-400">
                ONE TEAM • ONE DREAM
              </p>
            </div>
          </Link>

          {/* MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white text-2xl"
          >
            <FiMenu />
          </button>

          {/* DESKTOP LINKS */}
          <ul className="hidden md:flex gap-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition
                  ${
                    isActive(link.path)
                      ? "bg-amber-500 text-black"
                      : "text-gray-300 hover:text-amber-400"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* AUTH */}
          <div className="hidden md:block">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 text-xs"
              >
                <FiLogOut /> Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 bg-amber-500 text-black px-4 py-2 rounded-full text-xs font-bold"
              >
                <FiUser /> LOGIN
              </button>
            )}
          </div>
        </div>
      </div>

      {/* BACKDROP */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* NETFLIX STYLE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x > 120) setOpen(false);
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed top-0 right-0 h-full w-[80%] bg-[#071427]/30 border-l border-amber-500/20 shadow-2xl md:hidden"
          >
            <div className="p-6 flex flex-col h-full">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-amber-400 font-black tracking-widest">
                  MENU
                </h2>

                <button onClick={() => setOpen(false)}>
                  <FiX className="text-white text-xl" />
                </button>
              </div>

              {/* LINKS (STAGGER ANIMATION) */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
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
                  </motion.div>
                ))}
              </div>

              {/* AUTH */}
              <div className="mt-auto pt-6 border-t border-white/10">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl bg-red-500 text-white font-bold"
                  >
                    <FiLogOut className="inline mr-2" />
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="w-full py-3 rounded-xl bg-amber-500 text-black font-black"
                  >
                    <FiUser className="inline mr-2" />
                    LOGIN
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;