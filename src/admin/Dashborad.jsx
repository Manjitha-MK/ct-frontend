import React, { useEffect, useState } from "react";
import axios from "axios";
import Analytics from "./Analytics";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPlayers: 0,
    totalMatches: 0,
    totalWins: 0,
    totalLosses: 0,
  });
  const API = import.meta.env.VITE_API_URL;
  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(`${API}/api/dashboard`);
      console.log("API:", import.meta.env.VITE_API_URL);
      console.log("Response:", res.data);
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[
            { title: "Total Players", value: stats.totalPlayers },
            { title: "Total Matches", value: stats.totalMatches },
            { title: "Wins", value: stats.totalWins },
            { title: "Losses", value: stats.totalLosses },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-5 rounded shadow"
            >
              <h3 className="text-gray-500">{item.title}</h3>
              <h1 className="text-2xl font-bold">{item.value}</h1>
            </motion.div>
          ))}
        </motion.div>

        {/* Analytics */}
        {stats && <Analytics stats={stats} />}

      </div>
    </AdminLayout>
  );
};

export default Dashboard;
