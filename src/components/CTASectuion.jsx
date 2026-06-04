import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-r from-black via-[#0a1224] to-black border-y border-amber-500/10">

      {/* Glow effect background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#f59e0b,_transparent_60%)]" />

      <div className="relative max-w-5xl mx-auto text-center">

        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
          Ready to follow <span className="text-amber-500">AURA</span>?
        </h2>

        <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-xl mx-auto">
          Explore our players, matches, and journey as we build a championship-winning team.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/players"
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl transition active:scale-95"
          >
            View Players
          </Link>

          <Link
            to="/matches"
            className="border border-gray-600 hover:border-amber-500 text-white px-8 py-3 rounded-xl transition active:scale-95"
          >
            View Matches
          </Link>

          <Link
            to="/gallery"
            className="border border-gray-600 hover:border-amber-500 text-white px-8 py-3 rounded-xl transition active:scale-95"
          >
            View Gallery
          </Link>

        </div>

      </div>
    </section>
  );
};

export default CTASection;