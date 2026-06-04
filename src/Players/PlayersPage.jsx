import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import PlayerModal from "../components/Modal";
import Navbar from "../components/Navbar";
import PlayerImg from "../assets/playerimg.jpg"
import { motion, AnimatePresence } from "framer-motion";


const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ROLES = ["All Roles", "Batsman", "Bowler", "All-Rounder", "Wicketkeeper"];

const roleTheme = {
  Batsman: "from-orange-500/20 to-transparent text-orange-400",
  Bowler: "from-blue-500/20 to-transparent text-blue-400",
  "All-Rounder": "from-green-500/20 to-transparent text-green-400",
  Wicketkeeper: "from-purple-500/20 to-transparent text-purple-400",
};

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const captain = players.find((p) => p.isCaptain);
  const viceCaptain = players.find((p) => p.isViceCaptain);

  useEffect(() => {
    axios.get(`${API_BASE}/api/players`).then((res) => {
      setPlayers(res.data || []);
      setLoading(false);
    });

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const top3 = useMemo(
    () => [...players].sort((a, b) => b.totalRuns - a.totalRuns).slice(0, 3),
    [players],
  );

  const filtered = useMemo(() => {
    return players.filter((p) => {
      const matchSearch = p.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchRole = roleFilter === "All Roles" || p.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [players, search, roleFilter]);

  return (
    <div className="min-h-screen bg-[#050814] text-white overflow-x-hidden">
      <Navbar />

      {/* ===== HERO (WORLD CLASS DASHBOARD HEADER) ===== */}
      <div className="relative pt-24 px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={PlayerImg}
            className="w-full h-[280px] md:h-[420px] object-cover scale-105"
          />

          {/* gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050814]/95 via-[#050814]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs tracking-[0.35em] text-yellow-400 uppercase"
            >
              Aura Cricket Analytics
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-6xl font-black leading-tight"
            >
              Player Intelligence
            </motion.h1>

            <p className="text-white/50 text-xs md:text-sm mt-2 max-w-md">
              Real-time performance ranking powered by season data, runs,
              wickets & impact metrics.
            </p>
          </div>

          <div className="absolute top-4 right-4 bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-xl text-xs text-yellow-400">
            {players.length} Athletes
          </div>
        </div>
      </div>

      {/* ===== KPI STRIP ===== */}
      <div className="px-4 md:px-8 mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            label: "Total Runs",
            value: players.reduce((a, b) => a + (b.totalRuns || 0), 0),
          },
          {
            label: "Total Wickets",
            value: players.reduce((a, b) => a + (b.totalWickets || 0), 0),
          },
          {
            label: "Avg Matches",
            value: Math.round(
              players.reduce((a, b) => a + (b.matchesPlayed || 0), 0) /
                (players.length || 1),
            ),
          },
        ].map((k) => (
          <div
            key={k.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl hover:bg-white/10 transition"
          >
            <p className="text-xs text-white/40 uppercase tracking-widest">
              {k.label}
            </p>
            <p className="text-2xl font-bold text-yellow-400 mt-1">{k.value}</p>
          </div>
        ))}
      </div>

      {/* ===== CAPTAIN & VICE CAPTAIN ===== */}
      <div className="px-4 md:px-8 mt-10">
        <h2 className="text-xs tracking-[0.35em] text-white/40 uppercase mb-4">
          Team Leadership
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CAPTAIN */}
          {captain && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-br from-yellow-500/10 to-white/5 border border-yellow-500/30 rounded-3xl p-6 backdrop-blur-xl"
            >
              <div className="absolute top-3 right-3 text-yellow-400 text-xs font-bold">
                🧢 CAPTAIN
              </div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-yellow-500/40">
                  {captain.playerImage ? (
                    <img
                      src={captain.playerImage?.url}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30">
                      👤
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold">{captain.fullName}</h3>
                  <p className="text-xs text-white/40">
                    #{captain.jerseyNumber}
                  </p>
                  <p className="text-yellow-400 text-sm mt-1">
                    {captain.totalRuns} Runs
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* VICE CAPTAIN */}
          {viceCaptain && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-br from-blue-500/10 to-white/5 border border-blue-500/30 rounded-3xl p-6 backdrop-blur-xl"
            >
              <div className="absolute top-3 right-3 text-blue-400 text-xs font-bold">
                ⭐ VICE CAPTAIN
              </div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-blue-500/40">
                  {viceCaptain.playerImage ? (
                    <img
                      src={viceCaptain.playerImage?.url}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30">
                      👤
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold">{viceCaptain.fullName}</h3>
                  <p className="text-xs text-white/40">
                    #{viceCaptain.jerseyNumber}
                  </p>
                  <p className="text-blue-400 text-sm mt-1">
                    {viceCaptain.totalRuns} Runs
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ===== STICKY FILTER BAR ===== */}
      <div className={`sticky top-16 z-40 px-4 md:px-8 mt-10 transition-all`}>
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-3 flex flex-col md:flex-row gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search players..."
            className="flex-1 bg-transparent outline-none px-3 py-2 text-sm"
          />

          <div className="flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-2 rounded-xl text-xs border transition
                  ${
                    roleFilter === r
                      ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                      : "bg-white/5 border-white/10 text-white/50"
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PLAYER GRID ===== */}
      <div className="px-4 md:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-white/5 rounded-2xl animate-pulse"
                />
              ))}
          </div>
        ) : (
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((p) => (
                <motion.div
                  key={p._id}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelected(p)}
                  className="cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl hover:bg-white/10 transition"
                >
                  {/* role glow */}
                  <div
                    className={`h-1 w-full rounded-full bg-gradient-to-r ${roleTheme[p.role] || ""}`}
                  />

                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-white/10 mt-4">
                    {p.playerImage ? (
                      <img
                        src={p.playerImage?.url}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30">
                        👤
                      </div>
                    )}
                  </div>

                  <h3 className="text-center mt-3 font-semibold">
                    {p.fullName}
                  </h3>
                  <p className="text-center text-xs text-white/40">
                    #{p.jerseyNumber}
                  </p>

                  <div className="grid grid-cols-3 text-center mt-4 text-xs">
                    <div>
                      <p className="text-white/40">M</p>
                      <p>{p.matchesPlayed}</p>
                    </div>
                    <div>
                      <p className="text-yellow-400">Runs</p>
                      <p>{p.totalRuns}</p>
                    </div>
                    <div>
                      <p className="text-white/40">Wkts</p>
                      <p>{p.totalWickets}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <PlayerModal
        isOpen={!!selected}
        player={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
