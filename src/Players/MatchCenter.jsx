import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import MatchCard from "./MatchCard";
import NextMatchHero from "./NextMatchHero";
import {
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
} from "react-icons/fi";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MatchCenter = () => {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/matches`)
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching matches:", err);
        setLoading(false);
      });
  }, []);

  const upcomingMatches = matches
    .filter((m) => m.result === "Upcoming")
    .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));

  const nextMatch = upcomingMatches[0];

  const filteredMatches = matches.filter((match) => {
    if (filter === "upcoming") return match.result === "Upcoming";
    if (filter === "completed") return match.result !== "Upcoming";
    return true;
  });

  const totalMatches = matches.length;
  const wins = matches.filter((m) => m.result === "Win").length;
  const losses = matches.filter((m) => m.result === "Loss").length;
  const upcoming = matches.filter((m) => m.result === "Upcoming").length;

  const stats = [
    {
      title: "Matches",
      value: totalMatches,
      icon: <FiCalendar size={22} />,
    },
    {
      title: "Wins",
      value: wins,
      icon: <FiTrendingUp size={22} />,
    },
    {
      title: "Losses",
      value: losses,
      icon: <FiTrendingDown size={22} />,
    },
    {
      title: "Upcoming",
      value: upcoming,
      icon: <FiClock size={22} />,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071427] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-5" />
          <p className="text-amber-500 uppercase tracking-[0.3em] font-bold">
            Loading Match Center...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071427] text-white overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_45%)]" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 blur-[120px]" />

        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-amber-500 text-xs uppercase tracking-[0.35em] font-black">
            Aura Cricket Club
          </span>

          <h1 className="text-4xl md:text-6xl font-black mt-3">
            Match Center
          </h1>

          <p className="text-slate-400 mt-3 max-w-2xl">
            Follow upcoming fixtures, completed matches, results and team
            performance from Aura Cricket Club.
          </p>
        </motion.div>

        {/* Hero */}
        {nextMatch && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <NextMatchHero match={nextMatch} />
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{
                y: -4,
              }}
              className="
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-2xl
                p-5
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider">
                    {stat.title}
                  </p>

                  <h3 className="text-3xl font-black mt-2">
                    {stat.value}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-bold">
              Schedule & Results
            </span>

            <h2 className="text-3xl font-black mt-2">
              Fixtures & Results
            </h2>
          </div>

          {/* Filters */}
          <div className="flex bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl">
            {[
              { key: "all", label: "All" },
              { key: "upcoming", label: "Upcoming" },
              { key: "completed", label: "Completed" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  filter === item.key
                    ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Match Grid */}
        {filteredMatches.length > 0 ? (
          <motion.div
            layout
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredMatches.map((match, index) => (
              <motion.div
                key={match._id}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
              >
                <MatchCard match={match} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">🏏</div>

            <h3 className="text-2xl font-bold">
              No Matches Available
            </h3>

            <p className="text-slate-500 mt-3">
              Upcoming fixtures will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCenter;