import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import StatBarChart from "../components/StatBarChart";
import DonutChart from "../components/DonutChart";

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
const AnimatedNumber = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const to = Number(value);
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);
  return <>{display.toLocaleString()}</>;
};

// ─── KPI CARD ────────────────────────────────────────────────────────────────
const KpiCard = ({ icon, label, value, accentClass, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d1424] to-[#0f172a]
      border border-white/[0.06] p-5 transition-all duration-500 hover:border-white/[0.12] hover:scale-[1.02]
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${accentClass}`} />
      <div
        className={`absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-10 ${accentClass}`}
      />
      <div className="text-2xl mb-3">{icon}</div>
      <p className="text-[10px] tracking-[0.18em] text-slate-500 uppercase font-mono mb-1">
        {label}
      </p>
      <h2
        className="text-[32px] font-black leading-none text-white"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {visible ? <AnimatedNumber value={value} /> : "0"}
      </h2>
    </div>
  );
};

// ─── MAIN ────────────────────────────────────────────────────────────────────
const PlayerStats = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/players`)
      .then((r) => {
        const data = r.data;

        // ── Safely normalise whatever the API returns into an array ──
        if (Array.isArray(data)) {
          setPlayers(data);
        } else if (data && Array.isArray(data.players)) {
          // e.g. { players: [...] }
          setPlayers(data.players);
        } else if (data && Array.isArray(data.data)) {
          // e.g. { data: [...] }
          setPlayers(data.data);
        } else {
          // Unexpected shape — log it so you can fix the API response
          console.error("Unexpected API response shape:", data);
          setPlayers([]);
          setError("Unexpected data format from server.");
        }
      })
      .catch((err) => {
        console.error("API error:", err);
        setError("Failed to load player data.");
      })
      .finally(() => setLoading(false));
  }, []);

  // ─── KPIs ────────────────────────────────────────────────────────────────
  const kpis = useMemo(() => {
    // Guard: players is guaranteed to be an array here, but just in case
    const list = Array.isArray(players) ? players : [];

    const totalPlayers = list.length;
    const totalRuns = list.reduce((a, p) => a + (p.totalRuns || 0), 0);
    const totalWickets = list.reduce((a, p) => a + (p.totalWickets || 0), 0);

    return {
      totalPlayers,
      totalRuns,
      totalWickets,
      avgRuns: totalPlayers > 0 ? +(totalRuns / totalPlayers).toFixed(1) : 0,
      avgWickets:
        totalPlayers > 0 ? +(totalWickets / totalPlayers).toFixed(1) : 0,
    };
  }, [players]);

  // ─── PIE DATA ────────────────────────────────────────────────────────────
  const pieData = useMemo(() => {
    const roles = { Batsman: 0, Bowler: 0, "All-Rounder": 0, Wicketkeeper: 0 };
    players.forEach((p) => {
      if (roles[p.role] !== undefined) roles[p.role]++;
    });
    return Object.entries(roles).map(([name, value]) => ({ name, value }));
  }, [players]);

  // ─── CHART DATA ──────────────────────────────────────────────────────────
  const topRunners = useMemo(
    () =>
      [...players]
        .sort((a, b) => (b.totalRuns || 0) - (a.totalRuns || 0))
        .slice(0, 5)
        .map((p) => ({
          name: p.fullName?.split(" ")[0] || p.fullName,
          Runs: p.totalRuns || 0,
        })),
    [players],
  );

  const topWickets = useMemo(
    () =>
      [...players]
        .sort((a, b) => (b.totalWickets || 0) - (a.totalWickets || 0))
        .slice(0, 5)
        .map((p) => ({
          name: p.fullName?.split(" ")[0] || p.fullName,
          Wickets: p.totalWickets || 0,
        })),
    [players],
  );

  const kpiData = [
    {
      icon: "👥",
      label: "Players",
      value: kpis.totalPlayers,
      accentClass: "bg-amber-500",
      delay: 0,
    },
    {
      icon: "🏏",
      label: "Total Runs",
      value: kpis.totalRuns,
      accentClass: "bg-blue-500",
      delay: 80,
    },
    {
      icon: "🎯",
      label: "Wickets",
      value: kpis.totalWickets,
      accentClass: "bg-red-500",
      delay: 160,
    },
    {
      icon: "📈",
      label: "Avg Runs",
      value: kpis.avgRuns,
      accentClass: "bg-emerald-500",
      delay: 240,
    },
    {
      icon: "⚡",
      label: "Avg Wickets",
      value: kpis.avgWickets,
      accentClass: "bg-violet-500",
      delay: 320,
    },
  ];

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-[#050b18] text-white pt-28 pb-20 px-4 md:px-10 lg:px-14"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 40% at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 90% 90%, rgba(59,130,246,0.05) 0%, transparent 60%)
          `,
        }}
      >
        {/* HEADER */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] text-amber-500 uppercase font-mono">
              Thambilideniya Aura · Live Analytics
            </span>
          </div>
          <h1
            className="text-[clamp(44px,8vw,88px)] leading-[0.92] font-black tracking-tight mb-5"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            SPORTS
            <br />
            <span
              className="text-amber-500"
              style={{ WebkitTextStroke: "2px #f59e0b", color: "transparent" }}
            >
              INSIGHTS
            </span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-white/10" />
            <p className="text-[13px] text-slate-500 font-mono tracking-wide">
              Real-time player performance & team analytics
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-5">
            <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
            <p className="text-[11px] tracking-[0.3em] text-amber-500 uppercase font-mono">
              Loading Data...
            </p>
          </div>
        ) : error ? (
          <div className="h-96 flex items-center justify-center">
            <p className="text-red-400 font-mono text-sm">{error}</p>
          </div>
        ) : players.length === 0 ? (
          <div className="h-96 flex items-center justify-center">
            <p className="text-slate-500 font-mono text-sm">
              No player data found.
            </p>
          </div>
        ) : (
          <>
            {/* KPI GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
              {kpiData.map((k, i) => (
                <KpiCard key={i} {...k} />
              ))}
            </div>

            {mounted && (
              <div className="flex flex-col gap-4">
                {/* ROW 1: Runs + Donut */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <StatBarChart
                    className="lg:col-span-2"
                    title="Top Run Scorers"
                    data={topRunners}
                    dataKey="Runs"
                    color="#f59e0b"
                    gradientId="goldGrad"
                    gradientFrom="#fbbf24"
                    gradientTo="#b45309"
                    barClass="bg-amber-500"
                    textClass="text-amber-500"
                    height={300}
                  />
                  <DonutChart
                    title="Team Structure"
                    data={pieData}
                    colors={["#f59e0b", "#3b82f6", "#ef4444", "#14b8a6"]}
                    barClass="bg-slate-500"
                    textClass="text-slate-400"
                    height={200}
                  />
                </div>

                {/* ROW 2: Wickets */}
                <StatBarChart
                  title="Top Wicket Takers"
                  data={topWickets}
                  dataKey="Wickets"
                  color="#3b82f6"
                  gradientId="blueGrad"
                  gradientFrom="#60a5fa"
                  gradientTo="#1d4ed8"
                  barClass="bg-blue-500"
                  textClass="text-blue-400"
                  height={280}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PlayerStats;
