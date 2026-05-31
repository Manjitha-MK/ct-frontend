import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const PlayerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/players/${id}`
      );
      setPlayer(res.data);
    };

    fetchPlayer();
  }, [id]);

  if (!player) return null;

  return (
    <Modal
      isOpen={true}
      onClose={() => navigate("/players")} // close popup → go back list
    >
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Player Details</h2>

        <button
          onClick={() => navigate("/players")}
          className="text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`http://localhost:5000/uploads/${player.playerImage}`}
            className="w-40 h-40 rounded-2xl object-cover"
          />

          <div>
            <h1 className="text-2xl font-bold">{player.fullName}</h1>
            <p className="text-gray-500">#{player.jerseyNumber}</p>

            <p className="mt-2">
              Role: <b>{player.role}</b>
            </p>
            <p>Batting: {player.battingStyle || "N/A"}</p>
            <p>Bowling: {player.bowlingStyle || "N/A"}</p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div>
            <p>Matches</p>
            <b>{player.matchesPlayed}</b>
          </div>

          <div>
            <p>Runs</p>
            <b>{player.totalRuns}</b>
          </div>

          <div>
            <p>Wickets</p>
            <b>{player.totalWickets}</b>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PlayerDetails;