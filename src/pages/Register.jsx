import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import LogoImg from "../assets/logo.png"; 
import BgStadium from "../assets/stadium-bg.png";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("player");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser({
        name,
        email,
        password,
        role,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center select-none"
      style={{ backgroundImage: `url(${BgStadium})` }}
    >
      {/* Deep Dark Overlay matching mock atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-amber-950/40"></div>

      {/* Main Register Card Wrapper */}
      <div className="relative z-10 w-full max-w-md mt-16">
        {/* Floating Logo OVERLAPPING the card container with priority z-index */}
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-10 w-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:scale-105">
          <img
            src={LogoImg}
            alt="Thambilideniya Aura Logo"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Form Container with explicit lower z-index layer allocation */}
        <form
          onSubmit={handleSubmit}
          className="relative z-0 bg-slate-950/85 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-8 pt-28 shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-center"
        >
          {/* Header Typography */}
          <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white uppercase mb-2">
            CREATE <span className="text-amber-500">ACCOUNT</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mb-8 max-w-xs mx-auto leading-relaxed">
            Join the Aura squad to like, comment, and engage with the team.
          </p>

          {/* Name Input Field Container */}
          <div className="mb-5 text-left">
            <label className="block text-amber-500/85 text-[11px] font-bold tracking-widest uppercase mb-1.5 ml-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-slate-900/90 text-white placeholder-gray-600 px-4 py-3.5 rounded-xl border border-amber-500/10 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/40 transition-all duration-200 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input Field Container */}
          <div className="mb-5 text-left">
            <label className="block text-amber-500/85 text-[11px] font-bold tracking-widest uppercase mb-1.5 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-slate-900/90 text-white placeholder-gray-600 px-4 py-3.5 rounded-xl border border-amber-500/10 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/40 transition-all duration-200 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input Field Container */}
          <div className="mb-6 text-left">
            <label className="block text-amber-500/85 text-[11px] font-bold tracking-widest uppercase mb-1.5 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full bg-slate-900/90 text-white placeholder-gray-600 px-4 py-3.5 rounded-xl border border-amber-500/10 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/40 transition-all duration-200 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Premium Golden Action Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black tracking-wider text-sm py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/10 active:scale-[0.99] uppercase flex items-center justify-center gap-1"
          >
            REGISTER NOW
            <span className="text-base font-medium leading-none transform translate-y-[-1px] ml-1">
              →
            </span>
          </button>

          {/* Bottom Utility Link */}
          <p className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-slate-900/60">
            Already have an account?
            <Link
              to="/login"
              className="text-amber-500 hover:text-amber-400 font-bold ml-1.5 transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
