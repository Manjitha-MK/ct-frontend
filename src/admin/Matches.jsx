import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const Matches = () => {
  const [matches, setMatches] = useState([]);

  // Form States matching your Mongoose Schema
  const [opponentTeam, setOpponentTeam] = useState("");
  const [venue, setVenue] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [matchType, setMatchType] = useState("League");
  const [result, setResult] = useState("Upcoming");
  const [ourScore, setOurScore] = useState("");
  const [opponentScore, setOpponentScore] = useState("");

  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/matches";

  // GET MATCHES
  const fetchMatches = async () => {
    try {
      const res = await axios.get(API_URL);
      setMatches(res.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // RESET FORM
  const resetForm = () => {
    setOpponentTeam("");
    setVenue("");
    setMatchDate("");
    setMatchType("League");
    setResult("Upcoming");
    setOurScore("");
    setOpponentScore("");
    setEditId(null);
  };

  // ADD / UPDATE MATCH
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    const matchData = {
      opponentTeam,
      venue,
      matchDate,
      matchType,
      result,
      // If upcoming, don't submit scores
      ourScore: result === "Upcoming" ? "" : ourScore,
      opponentScore: result === "Upcoming" ? "" : opponentScore,
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, matchData);
      } else {
        await axios.post(API_URL, matchData);
      }
      resetForm();
      fetchMatches();
    } catch (error) {
      alert("Error saving match: " + error.response?.data?.message || error.message);
    }
  };

  // DELETE
  const deleteMatch = async (id) => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchMatches();
      } catch (error) {
        console.error("Error deleting match:", error);
      }
    }
  };

  // EDIT
  const editMatch = (match) => {
    setOpponentTeam(match.opponentTeam);
    setVenue(match.venue);
    setMatchDate(match.matchDate ? match.matchDate.split("T")[0] : "");
    setMatchType(match.matchType || "League");
    setResult(match.result);
    setOurScore(match.ourScore || "");
    setOpponentScore(match.opponentScore || "");
    setEditId(match._id);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Match Management</h1>
          {editId && (
            <button 
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* FORM SECTION */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {editId ? "📝 Edit Match Details" : "➕ Add New Match"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Opponent Team</label>
              <input
                required
                placeholder="e.g. Real Madrid"
                value={opponentTeam}
                onChange={(e) => setOpponentTeam(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Venue</label>
              <input
                required
                placeholder="e.g. Home Stadium / Away"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Match Date</label>
              <input
                required
                type="date"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Match Type</label>
              <select
                value={matchType}
                onChange={(e) => setMatchType(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="League">League</option>
                <option value="Tournament">Tournament</option>
                <option value="Friendly">Friendly</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status / Result</label>
              <select
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Win">Win</option>
                <option value="Loss">Loss</option>
                <option value="Draw">Draw</option>
              </select>
            </div>

            {/* DYNAMIC SCORE FIELDS (Hidden if match is upcoming) */}
            {result !== "Upcoming" && (
              <div className="grid grid-cols-2 gap-2 col-span-1">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Our Score</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={ourScore}
                    onChange={(e) => setOurScore(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Their Score</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={opponentScore}
                    onChange={(e) => setOpponentScore(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            <div className="md:col-span-3 flex justify-end mt-2">
              <button
                type="submit"
                className={`w-full md:w-auto px-6 py-2.5 text-white font-medium rounded-lg text-sm transition shadow-sm ${
                  editId ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {editId ? "💾 Save Changes" : "⚡ Publish Match"}
              </button>
            </div>
          </form>
        </div>

        {/* LIST SECTION (TABLE) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Existing Fixtures ({matches.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase text-gray-500 tracking-wider">
                  <th className="py-3 px-6">Opponent</th>
                  <th className="py-3 px-6">Type</th>
                  <th className="py-3 px-6">Venue</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6 text-center">Score</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {matches.map((match) => {
                  // Color helper for badges
                  const badgeColors = {
                    Win: "bg-green-50 text-green-700 border-green-200",
                    Loss: "bg-red-50 text-red-700 border-red-200",
                    Draw: "bg-gray-50 text-gray-600 border-gray-200",
                    Upcoming: "bg-blue-50 text-blue-700 border-blue-200",
                  };

                  return (
                    <tr key={match._id} className="hover:bg-gray-50/70 transition">
                      <td className="py-4 px-6 font-semibold text-gray-900">vs {match.opponentTeam}</td>
                      <td className="py-4 px-6"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{match.matchType || "League"}</span></td>
                      <td className="py-4 px-6 text-gray-500 truncate max-w-[150px]">{match.venue}</td>
                      <td className="py-4 px-6 text-gray-600">
                        {match.matchDate ? new Date(match.matchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                      </td>
                      <td className="py-4 px-6 text-center font-mono font-bold">
                        {match.result === "Upcoming" ? "—" : `${match.ourScore ?? 0} : ${match.opponentScore ?? 0}`}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColors[match.result] || "bg-gray-50"}`}>
                          {match.result}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => editMatch(match)}
                          className="text-blue-600 hover:text-blue-900 font-medium text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMatch(match._id)}
                          className="text-red-600 hover:text-red-900 font-medium text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {matches.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-400 font-medium">
                      No matches found. Create one above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Matches;