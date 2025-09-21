// src/components/admin/tableUI.jsx
import { alpha } from "@mui/material/styles";

export const adminPalette = (theme) => {
  const isDark = theme.palette.mode === "dark";
  return {
    border: alpha(theme.palette.text.primary, isDark ? 0.22 : 0.1),
    headBottom: alpha(theme.palette.divider, 0.9),
    hoverBg: alpha(theme.palette.secondary.main, isDark ? 0.18 : 0.08),
    chipBg: alpha(theme.palette.secondary.main, isDark ? 0.22 : 0.12),
    chipText: theme.palette.text.primary,
    good: theme.palette.success.main,
    mid: theme.palette.warning.main,
    bad: theme.palette.error.main,
    primary: theme.palette.secondary.main,
    primaryHover: theme.palette.secondary.dark,
    caption: alpha(theme.palette.text.secondary, 0.9),
  };
};

// export const headerBarSx = (theme) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   gap: 1,
//   flexWrap: "wrap",
//   mb: 3,
//   position: "relative",
//   zIndex: 0,
//   backgroundColor: alpha(
//     theme.palette.background.paper,
//     theme.palette.mode === "dark" ? 0.4 : 0.9
//   ),
//   borderRadius: 2,
//   px: { xs: 1.5, md: 2 },
//   py: 1,
// });
//
// export const tableContainerSx = (theme) => {
//   const p = adminPalette(theme);
//   return {
//     position: "relative",
//     isolation: "isolate",
//     zIndex: 2,
//     overflow: "hidden",
//     borderRadius: 14,
//     border: `1px solid ${p.border}`,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: "0 1px 0 rgba(0,0,0,0.06) inset",
//   };
// };
//
// export const tableHeadSx = (theme) => {
//   const isDark = theme.palette.mode === "dark";
//   const start = alpha(theme.palette.secondary.light, isDark ? 0.12 : 0.22);
//   const end = alpha(theme.palette.secondary.main, isDark ? 0.18 : 0.16);
//   const p = adminPalette(theme);
//   return {
//     background: `linear-gradient(90deg, ${start} 0%, ${end} 100%)`,
//     position: "relative",
//     zIndex: 1,
//     "& .MuiTableCell-head": {
//       fontWeight: 700,
//       color: theme.palette.text.primary,
//       borderBottom: `2px solid ${p.headBottom}`,
//       lineHeight: 1.4,
//       height: 52,
//       whiteSpace: "nowrap",
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//       borderTopLeftRadius: 0,
//       borderTopRightRadius: 0,
//     },
//     "& .MuiTableCell-head:first-of-type": { paddingLeft: 24 },
//     "& .MuiTableCell-head:last-of-type": { paddingRight: 24, textAlign: "right" },
//   };
// };

export const tableRowSx = (theme) => {
  const p = adminPalette(theme);
  return {
    transition: "background-color .2s ease",
    "&:hover": { backgroundColor: p.hoverBg },
  };
};

export const countChipSx = (theme) => {
  const p = adminPalette(theme);
  return { backgroundColor: p.chipBg, color: p.chipText, fontWeight: 700, height: 22 };
};

export const tagChipSx = (theme) => {
  const p = adminPalette(theme);
  return {
    backgroundColor: theme.palette.background.paper,
    borderColor: p.headBottom,
    color: theme.palette.text.primary,
    fontWeight: 600,
    height: 22,
  };
};

export const actionsCellSx = { whiteSpace: "nowrap" };

export function ratingColor(theme, value) {
  const p = adminPalette(theme);
  if (value >= 4.5) return p.good;
  if (value >= 3.5) return p.mid;
  return p.bad;
}

export const formPanelSx = (theme) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.paper, 0.6)
      : alpha(theme.palette.background.paper, 0.9),
  border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
  borderRadius: 3,
  p: { xs: 2, md: 3 },
  mb: 3,
  overflow: "visible",
  backdropFilter: theme.palette.mode === "dark" ? "saturate(110%) blur(2px)" : "none",
});

export const formFieldSx = {
  "& .MuiInputBase-root": { minHeight: 44, borderRadius: 2 },
};
