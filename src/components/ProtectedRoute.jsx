import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Show loading while checking auth
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // If not logged in → redirect to login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If logged in → allow access
    return children;
};

export const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <h2>Loading...</h2>;

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;