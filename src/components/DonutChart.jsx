import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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

// ─── SECTION TITLE ───────────────────────────────────────────────────────────
const SectionTitle = ({ label, barClass, textClass }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`w-[3px] h-[18px] rounded-full ${barClass}`} />
    <span className={`text-[11px] tracking-[0.22em] uppercase font-mono font-semibold ${textClass}`}>
      {label}
    </span>
  </div>
);

const DonutChart = ({
  title,
  data = [],
  colors = ["#f59e0b", "#3b82f6", "#ef4444", "#14b8a6"],
  barClass = "bg-slate-500",
  textClass = "text-slate-400",
  height = 200,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className={`bg-gradient-to-br from-[#0d1424] to-[#0f172a] border border-white/[0.06] rounded-2xl p-7 w-full ${className}`}>
      <SectionTitle label={title} barClass={barClass} textClass={textClass} />

      <div className="w-full min-w-0" style={{ height }}>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius="80%"
              innerRadius="46%"
              paddingAngle={3}
              onMouseEnter={(_, i) => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={colors[i % colors.length]}
                  opacity={activeIndex === null || activeIndex === i ? 1 : 0.3}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-col gap-2">
        {data.map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-between transition-opacity duration-200
              ${activeIndex !== null && activeIndex !== i ? "opacity-30" : "opacity-100"}`}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-[2px]"
                style={{ background: colors[i % colors.length] }}
              />
              <span className="text-[11px] text-slate-500 font-mono">{item.name}</span>
            </div>
            <span className="text-xs text-slate-300 font-semibold font-mono">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;