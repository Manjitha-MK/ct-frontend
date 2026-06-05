import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTrophy, FaUsers, FaImages, FaCalendarAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#050b18] text-gray-300 border-t border-amber-500/10 mt-20">
      
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h1 className="text-2xl font-black text-amber-500 tracking-wider">
            AURA
          </h1>

          <p className="text-sm text-gray-400 mt-3 leading-relaxed">
            Thambilideniya Aura Cricket Team — built on passion, unity, and discipline.
            We don’t just play cricket, we create legacy.
          </p>

          <div className="mt-4 text-xs text-gray-500">
            ONE TEAM • ONE AURA • ONE DREAM
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="text-white font-bold mb-4 tracking-wide uppercase text-sm">
            Quick Links
          </h2>

          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-amber-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/players" className="hover:text-amber-400 transition">
                Players
              </Link>
            </li>

            <li>
              <Link to="/matches" className="hover:text-amber-400 transition">
                Matches
              </Link>
            </li>

            <li>
              <Link to="/leaderboard" className="hover:text-amber-400 transition">
                Leaderboard
              </Link>
            </li>

            <li>
              <Link to="/gallery" className="hover:text-amber-400 transition">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h2 className="text-white font-bold mb-4 tracking-wide uppercase text-sm">
            Follow Us
          </h2>

          <p className="text-sm text-gray-400 mb-4">
            Stay connected with our latest matches and updates.
          </p>

          <a
            href="https://www.facebook.com/share/14iZnZUFNrY/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 px-4 py-3 rounded-xl transition"
          >
            <FaFacebookF className="text-blue-500" />
            <span className="text-sm font-semibold">
              Facebook Page
            </span>
          </a>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-xs text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} AURA Cricket Team. All rights reserved.
          </p>

          <div className="text-xs text-gray-500 text-center">Development by MK</div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FaTrophy /> Cricket Club
            </span>
            <span className="flex items-center gap-1">
              <FaUsers /> Team Spirit
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt /> Season 2026
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;