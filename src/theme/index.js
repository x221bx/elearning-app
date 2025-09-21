import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";

const BRAND_PRIMARY = "#F9A825";
const BRAND_ACCENT = "#1976D2";

const basePalettes = {
  light: {
    background: { default: "#F9FAFB", paper: "#FFFFFF" },
    text: { primary: "#101828", secondary: "#475467" },
    divider: "#E5E7EB",
  },
  dark: {
    background: { default: "#101828", paper: "#111B2F" },
    text: { primary: "#F8FAFC", secondary: "#CBD5F5" },
    divider: alpha("#CBD5F5", 0.24),
  },
};

const buildBrandTokens = (mode) => {
  const isDark = mode === "dark";
  return {
    main: BRAND_PRIMARY,
    contrastText: isDark ? "#161C24" : "#141414",
    soft: isDark ? alpha(BRAND_PRIMARY, 0.22) : alpha(BRAND_PRIMARY, 0.12),
    hover: isDark ? alpha(BRAND_PRIMARY, 0.3) : alpha(BRAND_PRIMARY, 0.18),
    border: isDark ? alpha(BRAND_PRIMARY, 0.32) : alpha(BRAND_PRIMARY, 0.26),
  };
};

const buildCssVariables = (mode, palette) => ({
  "--bg-color": palette.background.default,
  "--card-bg": palette.background.paper,
  "--card-shadow": mode === "dark"
    ? "0 18px 48px rgba(8,12,20,0.45)"
    : "0 18px 40px rgba(15,23,42,0.12)",
  "--text-color": palette.text.primary,
  "--text-muted": palette.text.secondary,
  "--navbar-bg": palette.background.paper,
  "--navbar-color": palette.text.primary,
  "--primary-btn-bg": palette.primary.main,
  "--primary-btn-hover": palette.primary.dark,
  "--primary-btn-color": palette.primary.contrastText,
  "--brand-soft": palette.brand.soft,
  "--brand-hover": palette.brand.hover,
});

const getPalette = (mode) => {
  const base = basePalettes[mode];
  const brand = buildBrandTokens(mode);
  return {
    mode,
    brand,
    primary: {
      main: BRAND_PRIMARY,
      dark: "#C17F00",
      light: "#FFE082",
      contrastText: brand.contrastText,
    },
    secondary: {
      main: BRAND_ACCENT,
      dark: "#0F4EA8",
      light: "#63A4FF",
      contrastText: "#FFFFFF",
    },
    success: { main: "#2E7D32" },
    warning: { main: "#ED6C02" },
    error: { main: "#D32F2F" },
    divider: base.divider,
    background: base.background,
    text: base.text,
  };
};

const getComponents = (mode, palette) => ({
  MuiCssBaseline: {
    styleOverrides: {
      ":root": buildCssVariables(mode, palette),
      body: {
        margin: 0,
        minHeight: "100vh",
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        fontFamily: '"Cairo", "Inter", "Segoe UI", sans-serif',
        transition: "background-color 0.3s ease, color 0.3s ease",
        colorScheme: mode,
      },
      "#root": { minHeight: "100%" },
      a: { color: "inherit" },
      img: { maxWidth: "100%", display: "block" },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        overflow: "hidden",
        transition: "background-color 0.3s ease, color 0.3s ease",
        borderRadius: 12,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        fontWeight: 600,
        borderRadius: 10,
        textTransform: "none",
        paddingInline: 16,
      },
      sizeMedium: {
        minHeight: 44,
      },
      sizeLarge: {
        minHeight: 48,
      },
    },
  },
  MuiChip: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: {
        borderRadius: 16,
        height: 28,
        fontWeight: 600,
        paddingInline: 12,
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        minHeight: 44,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.18 : 0.06),
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        fontWeight: 600,
        letterSpacing: 0.2,
      },
    },
  },
  MuiLink: {
    defaultProps: {
      underline: "hover",
    },
    styleOverrides: {
      root: {
        color: mode === "dark" ? palette.secondary.light : palette.secondary.main,
        fontWeight: 600,
      },
    },
  },
});

export const createAppTheme = (mode = "light") => {
  const palette = getPalette(mode);
  return createTheme({
    palette,
    spacing: 8,
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: '"Cairo", "Inter", "Segoe UI", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 500 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: getComponents(mode, palette),
  });
};

