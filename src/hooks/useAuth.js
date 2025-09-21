import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx; // { auth, setCredentials, logout }
}

export const isAdmin = () => {
    try {
        const sessionActive = localStorage.getItem("edudu:session") === "1";
        return sessionActive && localStorage.getItem("userRole") === "teacher";
    } catch {
        return false;
    }
};
