import React from "react";
import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaUsers,
  FaCalendarAlt,
  FaImages,
} from "react-icons/fa";

const CTASection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-[#030712] overflow-hidden border-y border-zinc-900">
      {/* 1. Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* 2. Dual-Core Atmospheric Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Inner Premium Glass Box */}
        <div className="relative bg-gradient-to-b from-zinc-900/40 to-black/40 border border-zinc-800/50 rounded-3xl p-8 sm:p-12 lg:p-16 backdrop-blur-md overflow-hidden group shadow-2xl shadow-black/50">
          {/* Subtle line flash accent on hover */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

          <div className="max-w-2xl mx-auto text-center space-y-6">
            {/* Kicker Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] text-amber-500 bg-amber-500/10 border border-amber-500/20 uppercase">
              <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
              Join The Journey
            </span>

            {/* Typography with deep text-shadow */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none drop-shadow-xl select-none">
              Ready to follow <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">
                THE AURA?
              </span>
            </h2>

            <p className="text-zinc-400 text-xs sm:text-sm lg:text-base max-w-lg mx-auto leading-relaxed font-medium">
              Explore player breakdowns, track upcoming tournament fixtures, and
              experience our relentless journey toward greatness.
            </p>

            {/* Asymmetrical Action Hub */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Action Button */}
              <Link
                to="/players"
                className="w-full sm:w-auto group/btn flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-600/20 hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <FaUsers className="text-zinc-950 transition-transform group-hover/btn:scale-110" />
                <span>Explore Squad</span>
                <FaChevronRight className="text-[10px] transition-transform group-hover/btn:translate-x-1" />
              </Link>

              {/* Secondary Links Cluster */}
              <div className="w-full sm:w-auto flex items-center justify-center gap-3">
                <Link
                  to="/matches"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 border border-zinc-800 hover:border-amber-500/40 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 font-bold text-xs uppercase tracking-wider px-5 py-4 rounded-xl transition-all duration-300 active:scale-[0.98]"
                >
                  <FaCalendarAlt
                    size={12}
                    className="opacity-70 group-hover:text-amber-400"
                  />
                  <span>Matches</span>
                </Link>

                <Link
                  to="/gallery"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 border border-zinc-800 hover:border-amber-500/40 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 font-bold text-xs uppercase tracking-wider px-5 py-4 rounded-xl transition-all duration-300 active:scale-[0.98]"
                >
                  <FaImages
                    size={12}
                    className="opacity-70 group-hover:text-amber-400"
                  />
                  <span>Gallery</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
