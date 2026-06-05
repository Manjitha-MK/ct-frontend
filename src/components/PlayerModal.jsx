import React from "react";
import {
  FaUser,
  FaBaseballBall,
  FaBowlingBall,
  FaBirthdayCake,
} from "react-icons/fa";

const PlayerModal = ({ isOpen, onClose, player }) => {
  if (!isOpen || !player) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* DARK BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* GLASS CARD */}
      <div className="relative w-[92%] md:w-[650px] rounded-3xl p-6
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-[0_8px_30px_rgb(0,0,0,0.3)] text-white">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-red-400 text-xl"
        >
          ✕
        </button>

        {/* ================= TOP SECTION ================= */}
        <div className="flex items-center gap-5">

          {/* IMAGE */}
          <div className="w-28 h-28 rounded-2xl overflow-hidden border border-white/30 shadow-lg">
            <img
              src={player.playerImage?.url}
              className="w-full h-full object-cover"
              alt="player"
            />
          </div>

          {/* NAME + INFO */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              {player.fullName}
            </h2>

            <p className="text-sm text-white/70 mt-1">
              Jersey #{player.jerseyNumber}
            </p>

            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full
              bg-white/20 border border-white/30 backdrop-blur-md">
              {player.role}
            </span>
          </div>
        </div>

        {/* ================= DETAILS GRID ================= */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Born */}
          <div className="flex gap-3 p-4 rounded-xl
            bg-white/10 border border-white/20 backdrop-blur-md">
            <FaBirthdayCake className="text-pink-300 mt-1" />
            <div>
              <p className="text-xs text-white/60">Born</p>
              <p className="font-medium">{player.dateOfBirth ? new Date(player.dateOfBirth).toLocaleDateString() : "N/A"}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex gap-3 p-4 rounded-xl
            bg-white/10 border border-white/20 backdrop-blur-md">
            <FaUser className="text-blue-300 mt-1" />
            <div>
              <p className="text-xs text-white/60">Role</p>
              <p className="font-medium">{player.role}</p>
            </div>
          </div>

          {/* Batting */}
          <div className="flex gap-3 p-4 rounded-xl
            bg-white/10 border border-white/20 backdrop-blur-md">
            <FaBaseballBall className="text-green-300 mt-1" />
            <div>
              <p className="text-xs text-white/60">Batting Style</p>
              <p className="font-medium">{player.battingStyle || "N/A"}</p>
            </div>
          </div>

          {/* Bowling */}
          <div className="flex gap-3 p-4 rounded-xl
            bg-white/10 border border-white/20 backdrop-blur-md">
            <FaBowlingBall className="text-purple-300 mt-1" />
            <div>
              <p className="text-xs text-white/60">Bowling Style</p>
              <p className="font-medium">{player.bowlingStyle || "N/A"}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlayerModal;