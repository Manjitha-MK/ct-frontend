import React from "react";
import Navbar from "../components/Navbar";
import { FaTrophy, FaUsers, FaChartLine, FaMedal } from "react-icons/fa";
import CoverImg from "../assets/coverimg.jpg";
import winImg from "../assets/win.webp";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="bg-[#050b18] text-white min-h-screen font-sans overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="relative h-svh min-h-[600px] md:min-h-[750px] lg:h-[90vh] flex items-end md:items-center justify-center text-white px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
      >
        {/* Background Image Container */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat scale-105 transition-all duration-700"
          style={{
            backgroundImage: `url(${CoverImg})`,
            backgroundPosition: "center 20%",
          }}
        />

        {/* Cinematic Atmospheric Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 md:bg-gradient-to-r md:from-black/90 md:via-black/40 md:to-black/20" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl pb-12 sm:pb-16 md:pb-0">
          <div className="text-center md:text-left max-w-sm sm:max-w-xl lg:max-w-2xl mx-auto md:mx-0">
            
            <p className="text-gray-300 tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs font-bold">
              THAMBILIDENIYA
            </p>

            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-amber-500 leading-none mt-1 sm:mt-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] select-none">
              AURA
            </h1>

            <p className="mt-4 sm:mt-5 text-xs sm:text-sm lg:text-base text-gray-100 font-bold tracking-wider uppercase border-b border-gray-800/80 pb-3">
              ONE TEAM. ONE AURA. ONE DREAM.
            </p>

            <p className="mt-3 sm:mt-4 text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xs sm:max-w-md mx-auto md:mx-0">
              Built on passion. Driven by unity. We don’t just play cricket, we live it.
            </p>

            {/* Responsive UI Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Link to="/players" className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 px-8 py-3.5 font-black text-xs tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/10 active:scale-[0.98]">
                Explore Team
              </Link>

              <Link to="/matches" className="w-full sm:w-auto border-2 border-gray-700 hover:border-amber-500 text-gray-300 hover:text-amber-400 bg-black/20 backdrop-blur-sm px-8 py-3.5 font-black text-xs tracking-wider uppercase rounded-xl transition-all duration-300 active:scale-[0.98]">
                View Matches
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 mt-16 sm:mt-24 lg:mt-32 pb-24 flex flex-col md:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
        
        {/* Left Side: Image Container */}
        <div className="w-full md:w-1/2 group overflow-hidden rounded-2xl border border-amber-500/10 shadow-2xl shadow-black">
          <img
            src={winImg}
            alt="Thambilideniya Aura Squad"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
          />
        </div>

        {/* Right Side: Text & Info Column */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-xs lg:text-sm text-amber-500/80 font-bold tracking-[0.2em] uppercase">
            ABOUT AURA TEAM
          </h2>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-2 leading-tight uppercase">
            MORE THAN A TEAM,<br className="hidden lg:block"/> WE ARE A <span className="text-amber-500">FAMILY</span>.
          </h1>

          <p className="text-gray-400 mt-4 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
            Thambilideniya Aura is more than just a cricket team. We are a
            brotherhood built on trust, hard work, and a never-give-up attitude.
            Every match is a milestone, and every tournament is a step toward global greatness.
          </p>

          <button className="mt-6 sm:mt-8 border border-amber-500/30 hover:bg-amber-500 text-amber-400 hover:text-black px-6 sm:px-8 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-300 active:scale-[0.98]">
            READ MORE
          </button>
        </div>

      </section>
    </div>
  );
};

export default Homepage;