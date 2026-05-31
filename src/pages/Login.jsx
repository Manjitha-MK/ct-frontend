import React, { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LogoImg from "../assets/logo.png"; // Replace with your transparent logo path
import BgStadium from "../assets/stadium-bg.png"; // Replace with your stadium image path
import Navbar from "../components/Navbar";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      // 👇 now handled by context
      login(data, data.token);

      alert("Login Successful");

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/players");
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <>
    <Navbar />
    <div
      className="relative min-h-screen flex items-center justify-center px-4 py-12 pt-24 md:pt-22  bg-cover bg-center select-none"
      style={{ backgroundImage: `url(${BgStadium})` }}
    >
      {/* Deep Dark Overlay matching mock atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-amber-950/40"></div>

      {/* Main Login Card Wrapper */}
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
            TEAM <span className="text-amber-500">LOGIN</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mb-8 max-w-xs mx-auto leading-relaxed">
            Access your account to view dashboards or engage with your squad.
          </p>

          {/* Email Input Field Container */}
          <div className="mb-5 text-left">
            <label className="block text-amber-500/85 text-[11px] font-bold tracking-widest uppercase mb-1.5 ml-1">
              Username / Email
            </label>
            <input
              type="text"
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
              placeholder="••••••••"
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
            LOG IN TO YOUR AURA
            <span className="text-base font-medium leading-none transform translate-y-[-1px] ml-1">
              →
            </span>
          </button>

          {/* Bottom Utility Link */}
          <p className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-slate-900/60">
            No account?
            <Link
              to="/register"
              className="text-amber-500 hover:text-amber-400 font-bold ml-1.5 transition-colors"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
