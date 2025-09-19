// src/contexts/AuthContext.jsx
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

    // load from localStorage on mount
    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        const name  = localStorage.getItem("userName");
        const role  = localStorage.getItem("userRole") || "student";
        if (email) setAuth({ email, name, role });
    }, []);

    const setCredentials = useCallback(({ email, name, role }) => {
        const safeRole = role || "student";
        if (email) localStorage.setItem("userEmail", email);
        if (name)  localStorage.setItem("userName", name);
        if (safeRole) localStorage.setItem("userRole", safeRole);
        setAuth({ email, name, role: safeRole });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userPassword");
        setAuth(null);
    }, []);

    const isAdmin = useMemo(() => auth?.role === "teacher", [auth]);

    const value = useMemo(() => ({
        auth, isAdmin, setCredentials, logout
    }), [auth, isAdmin, setCredentials, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
