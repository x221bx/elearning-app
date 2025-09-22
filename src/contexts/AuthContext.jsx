/* eslint-disable react-refresh/only-export-components */
// src/contexts/AuthContext.jsx
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const SESSION_KEY = "edudu:session"; // '1' when logged in
    const CURRENT_EMAIL_KEY = "edudu:currentEmail";
    const CURRENT_UID_KEY = "edudu:currentUserId";

    // load from localStorage on mount
    useEffect(() => {
        const isActive = localStorage.getItem(SESSION_KEY) === "1";
        if (!isActive) { setAuth(null); return; }

        // Prefer new per-user current markers
        let email = localStorage.getItem(CURRENT_EMAIL_KEY);
        let userId = localStorage.getItem(CURRENT_UID_KEY);

        // Backward compatibility: migrate from legacy single-user keys
        if (!email) email = localStorage.getItem("userEmail");
        if (!userId && email) {
            userId = localStorage.getItem(`edudu:uid:${email}`) || localStorage.getItem("userId");
            if (userId) {
                localStorage.setItem(CURRENT_EMAIL_KEY, email);
                localStorage.setItem(CURRENT_UID_KEY, userId);
            }
        }

        if (email && userId) {
            // Optional per-user stored name/role; fall back to global keys
            const name = localStorage.getItem(`edudu:name:${userId}`) || localStorage.getItem("userName");
            const role = localStorage.getItem(`edudu:role:${userId}`) || localStorage.getItem("userRole") || "student";
            setAuth({ userId, email, name, role });
        } else {
            setAuth(null);
        }
    }, []);

    const setCredentials = useCallback(({ email, name, role }) => {
        const normalizedEmail = String(email || "").toLowerCase();
        const safeRole = role || "student";

        // Get or create a stable userId per email
        let userId = localStorage.getItem(`edudu:uid:${normalizedEmail}`);
        if (!userId) {
            userId = (crypto?.randomUUID && crypto.randomUUID()) || Math.random().toString(36).slice(2);
            localStorage.setItem(`edudu:uid:${normalizedEmail}`, userId);
        }

        // Save per-user metadata
        if (name) localStorage.setItem(`edudu:name:${userId}`, name);
        localStorage.setItem(`edudu:role:${userId}`, safeRole);

        // Mark current session user
        localStorage.setItem(CURRENT_EMAIL_KEY, normalizedEmail);
        localStorage.setItem(CURRENT_UID_KEY, userId);
        localStorage.setItem(SESSION_KEY, "1");

        // Legacy compatibility (some code checks these)
        localStorage.setItem("userEmail", normalizedEmail);
        localStorage.setItem("userId", userId);
        if (name) localStorage.setItem("userName", name);
        localStorage.setItem("userRole", safeRole);

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
            localStorage.removeItem(CURRENT_EMAIL_KEY);
            localStorage.removeItem(CURRENT_UID_KEY);
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
