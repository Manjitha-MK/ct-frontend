import React from 'react';

const MatchCard = ({ match }) => {
  const isUpcoming = match.result === 'Upcoming';
  
  // Custom theme badge styles matching your palette
  const resultBadges = {
    Win: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Loss: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    Draw: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    Upcoming: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  };

  return (
    <div className="bg-[#111726] border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between relative group">
      
      {/* Top Details */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-[#1a233a] px-2.5 py-1 rounded">
          {match.matchType}
        </span>
        <span className={`text-[10px] font-black tracking-widest px-2.5 py-1 rounded uppercase border ${resultBadges[match.result]}`}>
          {match.result}
        </span>
      </div>

      {/* Main Matchup Arena Block */}
      <div className="flex items-center justify-between my-2">
        <div className="flex-1">
          <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Aura Cricket</p>
          <p className="font-black text-white text-xl tracking-tight uppercase group-hover:text-amber-500 transition-colors">
            {match.opponentTeam}
          </p>
        </div>

        {/* Dynamic Display Score vs Status Indicator */}
        <div className="text-right ml-4">
          {isUpcoming ? (
            <span className="text-xs font-black tracking-widest text-amber-500 bg-amber-500/5 border border-amber-500/10 px-3 py-1.5 rounded">
              VS
            </span>
          ) : (
            <div className="font-mono text-2xl font-black tracking-tight text-white bg-[#0b0f19] px-3 py-1 rounded border border-slate-800/60">
              <span className={match.result === 'Win' ? 'text-amber-400' : 'text-slate-300'}>{match.ourScore}</span>
              <span className="text-slate-600 px-1.5 text-xl font-normal">:</span>
              <span className={match.result === 'Loss' ? 'text-amber-400' : 'text-slate-400'}>{match.opponentScore}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Meta-Logistics */}
      <div className="mt-5 pt-4 border-t border-slate-800/60 flex justify-between items-center text-xs text-slate-400">
        <div className="flex items-center gap-1 font-medium text-slate-400">
          📅 {new Date(match.matchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        <div className="max-w-[160px] truncate text-slate-500 font-medium">
          📍 {match.venue}
        </div>
      </div>

    </div>
  );
};

export default MatchCard;