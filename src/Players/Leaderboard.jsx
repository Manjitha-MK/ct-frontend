import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const COLORS = {
  amber: "#F59E0B",
  teal: "#2DD4BF",
};

const initials = (name = "") =>
  name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

// ───────────────── MEDAL ─────────────────
const getMedal = (i) => (i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`);

// ───────────────── ROW ─────────────────
const BarRow = ({ rank, player, value, max, accent }) => {
  const pct = Math.max((value / max) * 100, 5);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.03)",
        marginBottom: 10,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* glow */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: `${pct}%`,
          background: `${accent}20`,
        }}
      />

      {/* rank */}
      <div style={{ zIndex: 2, minWidth: 40, fontWeight: 700, color: accent }}>
        {getMedal(rank)}
      </div>

      {/* avatar */}
      <div
        style={{
          zIndex: 2,
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "#222",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          fontSize: 12,
        }}
      >
        {player.playerImage ? (
          <img src={player.playerImage} style={{ width: "100%" }} />
        ) : (
          initials(player.fullName)
        )}
      </div>

      {/* name */}
      <div style={{ flex: 1, zIndex: 2 }}>
        <div style={{ color: "#fff", fontSize: 13 }}>
          {player.fullName}
        </div>

        <div style={{ height: 4, background: "#222", borderRadius: 10 }}>
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: accent,
              borderRadius: 10,
            }}
          />
        </div>
      </div>

      {/* value */}
      <div style={{ color: accent, fontWeight: 700 }}>
        {value}
      </div>
    </motion.div>
  );
};

// ───────────────── TABLE ─────────────────
const TableCard = ({ title, players, keyName, accent }) => {
  const max = useMemo(
    () => Math.max(...players.map(p => p[keyName] || 0)),
    [players, keyName]
  );

  return (
    <div
      style={{
        minWidth: "100%",
        flexShrink: 0,
        padding: 16,
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20,
          padding: 16,
        }}
      >
        <h3 style={{ color: "#fff", marginBottom: 12 }}>{title}</h3>

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
  );
};

// ───────────────── MAIN ─────────────────
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
    return <div style={{ color: "#fff", padding: 40 }}>Loading...</div>;
  }

  return (
    <>
      {/* FIX NAVBAR OVERLAP */}
      <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
        <Navbar />
      </div>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg,#050c1d,#070f28)",
          color: "#fff",
          paddingTop: 90, // 🔥 FIX: prevents navbar overlap
        }}
      >
        {/* HERO */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>
          <h1 style={{ fontSize: 48, fontWeight: 700 }}>
            LEADER<span style={{ color: COLORS.amber }}>BOARD</span>
          </h1>
        </div>

        {/* SPOTLIGHT FIX (STACK ON MOBILE) */}
        <div
          style={{
            maxWidth: 1100,
            margin: "20px auto",
            padding: "0 16px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          <div style={{ background: "#111", padding: 16, borderRadius: 16 }}>
            🏏 Top Runs
          </div>
          <div style={{ background: "#111", padding: 16, borderRadius: 16 }}>
            🎯 Top Wickets
          </div>
        </div>

        {/* ───────────────── DESKTOP + MOBILE SWIPE ───────────────── */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 16px 40px",
          }}
        >
          {/* 🔥 MOBILE SWIPE CONTAINER */}
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: 12,
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              paddingBottom: 10,
            }}
          >
            {/* RUNS */}
            <div style={{ scrollSnapAlign: "start", minWidth: "100%" }}>
              <TableCard
                title="RUN SCORERS"
                players={runs}
                keyName="totalRuns"
                accent={COLORS.amber}
              />
            </div>

            {/* WICKETS */}
            <div style={{ scrollSnapAlign: "start", minWidth: "100%" }}>
              <TableCard
                title="WICKET TAKERS"
                players={wickets}
                keyName="totalWickets"
                accent={COLORS.teal}
              />
            </div>
          </div>

          {/* 🖥 DESKTOP GRID (hidden feel via layout) */}
          <div
            style={{
              display: "none",
              gap: 20,
              gridTemplateColumns: "1fr 1fr",
            }}
            className="desktop-grid"
          />
        </div>
      </div>
    </>
  );
}