import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const Players = () => {
  const [players, setPlayers] = useState([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState(""); // ✅ NEW
  const [jerseyNumber, setJerseyNumber] = useState("");

  const [battingStyle, setBattingStyle] = useState("");
  const [bowlingStyle, setBowlingStyle] = useState("");
  const [matchesPlayed, setMatchesPlayed] = useState("");
  const [totalRuns, setTotalRuns] = useState("");
  const [totalWickets, setTotalWickets] = useState("");

  const [isCaptain, setIsCaptain] = useState(false); // 🧢 NEW
  const [isViceCaptain, setIsViceCaptain] = useState(false); // ⭐ NEW

  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const fileInputRef = useRef(null);

  const fetchPlayers = async () => {
    const res = await axios.get("http://localhost:5000/api/players");
    setPlayers(res.data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const formRef = useRef(null);

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("fullName", name);
      formData.append("role", role);
      formData.append("age", Number(age));
      formData.append("dateOfBirth", dob);

      formData.append("jerseyNumber", Number(jerseyNumber));

      formData.append("battingStyle", battingStyle);
      formData.append("bowlingStyle", bowlingStyle);
      formData.append("matchesPlayed", Number(matchesPlayed));
      formData.append("totalRuns", Number(totalRuns));
      formData.append("totalWickets", Number(totalWickets));

      formData.append("isCaptain", isCaptain);
      formData.append("isViceCaptain", isViceCaptain);

      if (image) formData.append("playerImage", image);

      let res;

      if (editId) {
        res = await axios.put(
          `http://localhost:5000/api/players/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        alert("Player Updated");
      } else {
        res = await axios.post("http://localhost:5000/api/players", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Player Added");
      }

      // reset
      setName("");
      setRole("");
      setAge("");
      setDob("");
      setJerseyNumber("");
      setBattingStyle("");
      setBowlingStyle("");
      setMatchesPlayed("");
      setTotalRuns("");
      setTotalWickets("");
      setIsCaptain(false);
      setIsViceCaptain(false);
      setImage(null);
      setEditId(null);

      if (fileInputRef.current) fileInputRef.current.value = "";

      fetchPlayers();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  // ================= DELETE =================
  const deletePlayer = async (id) => {
    await axios.delete(`http://localhost:5000/api/players/${id}`);
    fetchPlayers();
  };

  // ================= EDIT =================
  const editPlayer = (p) => {
    setName(p.fullName);
    setRole(p.role);
    setAge(p.age);
    setDob(p.dateOfBirth ? p.dateOfBirth.split("T")[0] : "");
    setJerseyNumber(p.jerseyNumber);

    setBattingStyle(p.battingStyle || "");
    setBowlingStyle(p.bowlingStyle || "");
    setMatchesPlayed(p.matchesPlayed || "");
    setTotalRuns(p.totalRuns || "");
    setTotalWickets(p.totalWickets || "");

    setIsCaptain(!!p.isCaptain);
    setIsViceCaptain(!!p.isViceCaptain);

    setEditId(p._id);
    setImage(null);

    if (fileInputRef.current) fileInputRef.current.value = "";

    formRef.current.scrollIntoView({ behavior: "smooth" });
    console.log("EDIT PLAYER:", p);
  };


  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Players Management</h1>

        {/* ================= FORM ================= */}
        <div ref={formRef} className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-3">
          <input
            className="input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Role</option>
            <option>Batsman</option>
            <option>Bowler</option>
            <option>All-Rounder</option>
            <option>Wicketkeeper</option>
          </select>

          <select
            className="input"
            value={battingStyle}
            onChange={(e) => setBattingStyle(e.target.value)}
          >
            <option value="">Batting Style</option>
            <option>Right Handed</option>
            <option>Left Handed</option>
          </select>

          <select
            className="input"
            value={bowlingStyle}
            onChange={(e) => setBowlingStyle(e.target.value)}
          >
            <option value="">Bowling Style</option>
            <option>Fast</option>
            <option>Spin</option>
            <option>Medium Fast</option>
          </select>

          <input
            className="input"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          {/* 🎂 DOB */}
          <input
            type="date"
            className="input"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <input
            className="input"
            placeholder="Jersey No"
            value={jerseyNumber}
            onChange={(e) => setJerseyNumber(e.target.value)}
          />
          <input
            className="input"
            placeholder="Total runs"
            value={totalRuns}
            onChange={(e) => setTotalRuns(e.target.value)}
          />
          <input
            className="input"
            placeholder="Total wickets"
            value={totalWickets}
            onChange={(e) => setTotalWickets(e.target.value)}
          />
          <input
            className="input"
            placeholder="Matches Played"
            value={matchesPlayed}
            onChange={(e) => setMatchesPlayed(e.target.value)}
          />

          {/* 🧢 Captain */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCaptain}
              onChange={(e) => setIsCaptain(e.target.checked)}
            />
            Captain
          </label>

          {/* ⭐ Vice Captain */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isViceCaptain}
              onChange={(e) => setIsViceCaptain(e.target.checked)}
            />
            Vice Captain
          </label>

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {editId ? "Update" : "Add Player"}
          </button>
        </div>

        {/* ================= LIST ================= */}
        <div className="bg-white rounded-xl shadow divide-y">
          {players.map((p) => (
            <div key={p._id} className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-bold flex items-center gap-2">
                  {p.fullName}

                  {p.isCaptain && <span className="text-yellow-500">🧢</span>}
                  {p.isViceCaptain && <span className="text-blue-500">⭐</span>}
                </h3>

                <p className="text-sm text-gray-600">
                  {p.role} | Age: {p.age} | #{p.jerseyNumber}
                </p>

                <p className="text-sm text-gray-600">
                  Batting: {p.battingStyle || "N/A"} | Bowling:{" "}
                  {p.bowlingStyle || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Matches: {p.matchesPlayed}
                </p>

                <p className="text-sm">
                  Runs: {p.totalRuns} | Wkts: {p.totalWickets}
                </p>
                <p className="text-sm text-gray-600">
                  DOB:{" "}
                  {p.dateOfBirth
                    ? new Date(p.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <img
                src={p.playerImage?.url}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => editPlayer(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deletePlayer(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Players;
