// utils/apiClient.js
// -------------------------------------------------------------
// fetch JSON helper + server-first / seed-fallback helpers
// -------------------------------------------------------------
import { API_URL } from "./constants";

// Generic safe fetch returning null on fail
export async function safeJsonFetch(path, options) {
    try {
        const res = await fetch(`${API_URL}${path}`, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch {
        return null;
    }
}

// POST helper
export async function postJson(path, body) {
    return safeJsonFetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}

// DELETE helper
export async function deleteJson(path) {
    return safeJsonFetch(path, { method: "DELETE" });
}
