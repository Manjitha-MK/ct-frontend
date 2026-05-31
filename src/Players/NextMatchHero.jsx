import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiAward } from "react-icons/fi";

const NextMatchHero = ({ match }) => {
  if (!match) return null;

  const formattedDate = new Date(match.matchDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-2xl
      "
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-cyan-500/10" />

      <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-500/10 blur-[120px]" />

      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-500/10 blur-[120px]" />

      {/* Match Type Badge */}
      <div className="absolute top-5 right-5 z-20">
        <span
          className="
            px-4 py-2
            rounded-xl
            bg-amber-500/10
            border
            border-amber-500/20
            text-amber-400
            text-xs
            font-black
            tracking-widest
            uppercase
          "
        >
          {match.matchType}
        </span>
      </div>

      <div className="relative z-10 p-8 md:p-12">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.35em] text-amber-500 font-black">
            Next Match
          </span>

          <h2 className="text-3xl md:text-5xl font-black mt-3">
            Upcoming Fixture
          </h2>

          <p className="text-slate-400 mt-2">
            Get ready for the next challenge.
          </p>
        </div>

        {/* Teams Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8 w-full lg:w-auto">
            {/* AURA */}
            <motion.div whileHover={{ scale: 1.05 }} className="text-center">
              <div
                className="
                  w-28 h-28 md:w-32 md:h-32
                  rounded-full
                  bg-gradient-to-br
                  from-amber-400
                  to-amber-600
                  flex
                  items-center
                  justify-center
                  shadow-2xl
                  shadow-amber-500/30
                  mx-auto
                "
              >
                <span className="text-5xl font-black text-black">TA</span>
              </div>

              <h3 className="mt-5 text-2xl md:text-3xl font-black tracking-wide">
                THAMBILIDENIYA
              </h3>
              <h3 className="text-2xl md:text-3xl font-black text-amber-500 tracking-wide">AURA</h3>

              <p className="text-slate-400 text-sm mt-1">Cricket Club</p>
            </motion.div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <div
                className="
                  text-4xl md:text-6xl
                  font-black
                  tracking-wider
                "
              >
                VS
              </div>

              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-2" />
            </div>

            {/* Opponent */}
            <motion.div whileHover={{ scale: 1.05 }} className="text-center">
              <div
                className="
                  w-28 h-28 md:w-32 md:h-32
                  rounded-full
                  bg-slate-900/80
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  shadow-xl
                  mx-auto
                "
              >
                <span className="text-5xl font-black text-white">
                  {match.opponentTeam?.charAt(0)?.toUpperCase() || "O"}
                </span>
              </div>

              <h3 className="mt-5 text-2xl md:text-3xl font-black tracking-wide">
                {match.opponentTeam}
              </h3>

              <p className="text-slate-400 text-sm mt-1">Opponent Team</p>
            </motion.div>
          </div>

          {/* Match Details */}
          <div
            className="
              w-full
              lg:w-[380px]
              bg-black/20
              border
              border-white/10
              rounded-2xl
              p-6
              backdrop-blur-xl
            "
          >
            <h4 className="text-lg font-black mb-5">Match Information</h4>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div
                  className="
                    w-11 h-11
                    rounded-xl
                    bg-amber-500/10
                    flex
                    items-center
                    justify-center
                    text-amber-500
                  "
                >
                  <FiCalendar size={18} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Date
                  </p>

                  <p className="font-semibold text-slate-200 mt-1">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="
                    w-11 h-11
                    rounded-xl
                    bg-rose-500/10
                    flex
                    items-center
                    justify-center
                    text-rose-400
                  "
                >
                  <FiMapPin size={18} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Venue
                  </p>

                  <p className="font-semibold text-slate-200 mt-1">
                    {match.venue}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="
                    w-11 h-11
                    rounded-xl
                    bg-emerald-500/10
                    flex
                    items-center
                    justify-center
                    text-emerald-400
                  "
                >
                  <FiAward size={18} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Match Type
                  </p>

                  <p className="font-semibold text-slate-200 mt-1">
                    {match.matchType}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          className="
            mt-10
            border-t
            border-white/10
            pt-6
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-[0.25em]">
              Aura Cricket Club
            </p>

            <h4 className="font-black text-xl mt-1">
              ONE TEAM. ONE AURA. ONE DREAM.
            </h4>
          </div>

          <div
            className="
              px-5 py-3
              rounded-xl
              bg-amber-500/10
              border
              border-amber-500/20
              text-amber-400
              font-bold
            "
          >
            Match Day Coming Soon
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NextMatchHero;
