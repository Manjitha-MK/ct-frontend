import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import CoverImg from "../assets/coverimg.jpg";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const COLORS = {
  amber: "#F59E0B",
  teal: "#2DD4BF",
};

const initials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getMedal = (i) =>
  i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`;

// ───────── ROW ─────────
const BarRow = ({ rank, player, value, max, accent }) => {
  const pct = Math.max((value / max) * 100, 5);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative flex items-center gap-3 p-3 rounded-xl bg-black/40 backdrop-blur-md overflow-hidden"
    >
      {/* progress glow */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: `${pct}%`,
          background: `${accent}20`,
        }}
      />

      {/* rank */}
      <div className="z-10 w-10 font-bold" style={{ color: accent }}>
        {getMedal(rank)}
      </div>

      {/* avatar */}
      <div className="z-10 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden text-xs">
        {player.playerImage ? (
          <img
            src={player.playerImage?.url}
            className="w-full h-full object-cover"
          />
        ) : (
          initials(player.fullName)
        )}
      </div>

      {/* name + bar */}
      <div className="flex-1 z-10">
        <div className="text-white text-sm font-medium">
          {player.fullName}
        </div>

        <div className="h-1.5 bg-gray-700 rounded-full mt-2">
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: accent,
            }}
          />
        </div>
      </div>

      {/* value */}
      <div className="z-10 font-bold" style={{ color: accent }}>
        {value}
      </div>
    </motion.div>
  );
};

// ───────── TABLE ─────────
const TableCard = ({ title, players, keyName, accent }) => {
  const max = useMemo(
    () => Math.max(...players.map((p) => p[keyName] || 0), 1),
    [players, keyName]
  );

  return (
    <div className="w-full p-4">
      <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-2xl p-4">
        <h3 className="text-white text-lg font-semibold mb-4">
          {title}
        </h3>

        <div className="space-y-3">
          {players.map((p, i) => (
            <BarRow
              key={p._id}
              rank={i}
              player={p}
              value={p[keyName]}
              max={max}
              accent={accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ───────── MAIN ─────────
export default function Leaderboard() {
  const [runs, setRuns] = useState([]);
  const [wickets, setWickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [r, w] = await Promise.all([
          axios.get(`${API_BASE}/api/players/leaderboard/top-runs`),
          axios.get(`${API_BASE}/api/players/leaderboard/top-wickets`),
        ]);

        setRuns(r.data);
        setWickets(w.data);
      } catch {
        setRuns([]);
        setWickets([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050c1d] text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* PAGE BACKGROUND */}
      <div
        className="min-h-screen text-white pt-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(5,12,29,0.95)), url(${CoverImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* TITLE */}
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            LEADER<span className="text-amber-400">BOARD</span>
          </h1>
        </div>

        {/* TOP CARDS */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5">
            🏏 Top Runs
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5">
            🎯 Top Wickets
          </div>
        </div>

        {/* TABLES */}
        <div className="max-w-6xl mx-auto px-4 pb-10">
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory">
            {/* RUNS */}
            <div className="min-w-full snap-start">
              <TableCard
                title="RUN SCORERS"
                players={runs}
                keyName="totalRuns"
                accent={COLORS.amber}
              />
            </div>

            {/* WICKETS */}
            <div className="min-w-full snap-start">
              <TableCard
                title="WICKET TAKERS"
                players={wickets}
                keyName="totalWickets"
                accent={COLORS.teal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}