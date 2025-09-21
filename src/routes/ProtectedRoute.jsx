import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth, { isAdmin } from "../hooks/useAuth";

export default function ProtectedRoute({ children, requireAdmin }) {
    const location = useLocation();
    const { auth } = useAuth();

    if (!auth) {
         return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin()) {
        // Redirect to home if admin access is required but user is not admin
        return <Navigate to="/" replace />;
    }

    return children;
}
