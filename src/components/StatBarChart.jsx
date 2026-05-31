import React from "react";
import {
  BarChart, Bar, Cell, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

// ─── CUSTOM TOOLTIP ──────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0a0f1e] border border-amber-500/30 rounded-xl px-4 py-3 text-sm shadow-xl">
      <p className="text-slate-400 font-mono text-xs mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-bold text-base" style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

// ─── CUSTOM BAR LABEL ────────────────────────────────────────────────────────
const CustomBarLabel = ({ x, y, width, value }) => (
  <text
    x={x + width / 2} y={y - 6}
    fill="#475569" textAnchor="middle"
    fontSize={10} fontFamily="'DM Mono', monospace"
  >
    {value?.toLocaleString()}
  </text>
);

// ─── SECTION TITLE ───────────────────────────────────────────────────────────
const SectionTitle = ({ label, barClass, textClass }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`w-[3px] h-[18px] rounded-full ${barClass}`} />
    <span className={`text-[11px] tracking-[0.22em] uppercase font-mono font-semibold ${textClass}`}>
      {label}
    </span>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// StatBarChart
//
// Props:
//   title         string    Section heading
//   data          array     [{ name: string, [dataKey]: number }]
//   dataKey       string    Key to plot on Y axis e.g. "Runs"
//   color         string    Hex base color          default "#f59e0b"
//   gradientId    string    Unique SVG gradient id  default "barGrad"
//   gradientFrom  string    Top gradient color      default "#fbbf24"
//   gradientTo    string    Bottom gradient color   default "#b45309"
//   barClass      string    Tailwind class for title bar accent
//   textClass     string    Tailwind class for title text color
//   height        number    Chart height in px      default 300
//   className     string    Extra Tailwind classes on the wrapper
// ══════════════════════════════════════════════════════════════════════════════
const StatBarChart = ({
  title,
  data = [],
  dataKey,
  color = "#f59e0b",
  gradientId = "barGrad",
  gradientFrom = "#fbbf24",
  gradientTo = "#b45309",
  barClass = "bg-amber-500",
  textClass = "text-amber-500",
  height = 300,
  className = "",
}) => {
  return (
    <div className={`bg-gradient-to-br from-[#0d1424] to-[#0f172a] border border-white/[0.06] rounded-2xl p-7 w-full ${className}`}>
      <SectionTitle label={title} barClass={barClass} textClass={textClass} />

      <div className="w-full min-w-0" style={{ height }}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 24, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="transparent"
              tick={{ fill: "#475569", fontSize: 11, fontFamily: "'DM Mono',monospace" }}
            />
            <YAxis
              stroke="transparent"
              tick={{ fill: "#475569", fontSize: 10, fontFamily: "'DM Mono',monospace" }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: `${color}1a` }}
            />
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientFrom} />
                <stop offset="100%" stopColor={gradientTo} />
              </linearGradient>
            </defs>
            <Bar dataKey={dataKey} radius={[6, 6, 0, 0]} label={<CustomBarLabel />}>
              {data.map((_, i) => {
                // fade opacity for non-top bars using hex alpha
                const alpha = Math.max(0, Math.round((0.22 - i * 0.04) * 255))
                  .toString(16).padStart(2, "0");
                return (
                  <Cell
                    key={i}
                    fill={i === 0 ? `url(#${gradientId})` : `${color}${alpha}`}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatBarChart;