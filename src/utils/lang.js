const KEY = "lang";

export function getLang() {
    if (typeof window === "undefined") return "en";
    try {
        return window.localStorage.getItem(KEY) || "en";
    } catch {
        return "en";
    }
}

export function setLang(lng) {
    if (typeof window === "undefined") return;
    const v = lng === "ar" ? "ar" : "en";
    try {
        window.localStorage.setItem(KEY, v);
    } catch {}
}

export function applyDir(lng) {
    if (typeof document === "undefined") return;
    const isAR = lng === "ar";
    document.dir = isAR ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", isAR ? "ar" : "en");
}
