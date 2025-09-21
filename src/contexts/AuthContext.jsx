/* eslint-disable react-refresh/only-export-components */
// src/contexts/AuthContext.jsx
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const SESSION_KEY = "edudu:session"; // '1' when logged in

    // load from localStorage on mount
    useEffect(() => {
        const isActive = localStorage.getItem(SESSION_KEY) === "1";
        const userId = localStorage.getItem("userId");
        const email = localStorage.getItem("userEmail");
        if (isActive && email) {
            const name = localStorage.getItem("userName");
            const role = localStorage.getItem("userRole") || "student";
            setAuth({ userId, email, name, role });
        } else {
            setAuth(null);
        }
    }, []);

    const setCredentials = useCallback(({ email, name, role }) => {
        const existingId = localStorage.getItem("userId");
        const userId = existingId || crypto.randomUUID();
        const safeRole = role || "student";
        const normalizedEmail = email.toLowerCase();

        // Persist registered credentials (do not clear them on logout)
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", normalizedEmail);
        if (name) localStorage.setItem("userName", name);
        localStorage.setItem("userRole", safeRole);
        localStorage.setItem(SESSION_KEY, "1");

        setAuth({ userId, email: normalizedEmail, name, role: safeRole });

        // Migrate guest data if exists
        const guestCart = localStorage.getItem('cart:guest');
        const guestWishlist = localStorage.getItem('wishlist:guest');

        if (guestCart) {
            localStorage.setItem(`cart:${userId}`, guestCart);
            localStorage.removeItem('cart:guest');
        }

        if (guestWishlist) {
            localStorage.setItem(`wishlist:${userId}`, guestWishlist);
            localStorage.removeItem('wishlist:guest');
        }
    }, []);

    const logout = useCallback(() => {
        // End session but keep registered credentials so user can login again
        try {
            localStorage.removeItem(SESSION_KEY);
        } catch {}
        // Optionally keep userId to preserve user-specific data keys
        setAuth(null);
    }, []);

    const isAdmin = useMemo(() => auth?.role === "teacher", [auth]);

    const value = useMemo(() => ({
        auth, isAdmin, setCredentials, logout
    }), [auth, isAdmin, setCredentials, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
