import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
// import Navbar from "./components/Navbar";

// import PlayerProfile from "./player/Profile";
import Dashboard from "./admin/Dashborad";

import ProtectedRoute from "./components/ProtectedRoute";
import { AdminRoute } from "./components/ProtectedRoute";
import Players from "./admin/Players";
import Matches from "./admin/Matches";
import Gallery from "./admin/Gallery";
import { i } from "framer-motion/client";
import PlayersPage from "./Players/PlayersPage";
// import PlayerDetails from "./Players/PlayerDetails";
import PlayerStats from "./Players/PlayerStats";
import Leaderboard from "./Players/Leaderboard";
import GalleryPage from "./Players/GalleryPage";
import Homepage from "./Players/HomePage";
import IntroSplash from "./components/IntroSplash";
import MatchCenter from "./Players/MatchCenter";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      {/* 🔥 Navbar only for logged-in users (optional improvement later) */}

      <IntroSplash onFinish={() => setLoaded(true)} />

      {loaded && (
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Homepage />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Player Protected Route */}
          <Route
            path="/player/profile"
            element={<ProtectedRoute>{/* <PlayerProfile /> */}</ProtectedRoute>}
          />

          <Route path="/players" element={<PlayersPage />} />
          <Route path="/stats" element={<PlayerStats />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/matches" element={<MatchCenter />} />

          {/* Admin Protected Route */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          {/* Players page */}
          <Route
            path="/admin/players"
            element={
              <AdminRoute>
                <Players />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/matches"
            element={
              <AdminRoute>
                <Matches />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/gallery"
            element={<AdminRoute>{<Gallery />}</AdminRoute>}
          />

          {/* <Route
          path="/players/:id"
          element={
            <ProtectedRoute>
              <PlayerDetails />
            </ProtectedRoute>
          }
        /> */}
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
