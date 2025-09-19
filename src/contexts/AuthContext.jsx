// src/contexts/AuthContext.jsx
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

    // load from localStorage on mount
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const email = localStorage.getItem("userEmail");
        if (email) {
            const name = localStorage.getItem("userName");
            const role = localStorage.getItem("userRole") || "student";
            setAuth({ userId, email, name, role });
        }
    }, []);

    const setCredentials = useCallback(({ email, name, role }) => {
        const userId = crypto.randomUUID(); // Generate unique userId
        const safeRole = role || "student";
        const normalizedEmail = email.toLowerCase();

        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", normalizedEmail);
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
