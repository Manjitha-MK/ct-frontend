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

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get("import.meta.env.VITE_API_URL/api/dashboard");
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

        {/* Recent Matches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-5 rounded shadow"
        >
          <h2 className="text-xl font-bold mb-4">Recent Matches</h2>

          <ul className="space-y-3 text-gray-700">
            <li>RCB vs CSK - Win</li>
            <li>MI vs KKR - Loss</li>
            <li>SRH vs RR - Win</li>
          </ul>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
