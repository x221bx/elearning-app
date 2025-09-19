import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAdmin } from "../hooks/useAuth";

// teacher = admin
export default function ProtectedRoute({ children }) {
    const location = useLocation();
    return isAdmin() ? children : <Navigate to="/" state={{ from: location }} replace />;
}
