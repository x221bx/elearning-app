import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createAppTheme } from "./index";

const STORAGE_KEY = "edudu:theme-mode";

const ThemeModeContext = createContext({
  mode: "light",
  setMode: () => {},
  toggleMode: () => {},
});

const isValidStoredMode = (value) => value === "light" || value === "dark";

export const useThemeMode = () => useContext(ThemeModeContext);


export function AppThemeProvider({ children }) {
  const getPreferredMode = () => {
    if (typeof window === "undefined") return "light";
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isValidStoredMode(stored)) {
        return stored;
      }
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    } catch {
      return "light";
    }
  };

  const [mode, setModeState] = useState(getPreferredMode);
  const [lockToUserChoice, setLockToUserChoice] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isValidStoredMode(stored);
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-color-mode", mode);
    }
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        // ignore persistence issues
      }
    }
  }, [mode]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event) => {
      if (!lockToUserChoice) {
        setModeState(event.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [lockToUserChoice]);

  const setMode = useCallback((nextMode) => {
    setLockToUserChoice(true);
    setModeState(nextMode === "dark" ? "dark" : "light");
  }, []);

  const toggleMode = useCallback(() => {
    setLockToUserChoice(true);
    setModeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, setMode, toggleMode]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}
