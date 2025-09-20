// src/components/admin/tableUI.js

export const palette = {
    border: "rgba(0,0,0,0.08)",
    headBottom: "#e9ecef",
    hoverBg: "#f7f9fc",
    chipBg: "#eef2f6",
    chipText: "#1f2937",
    good: "#2e7d32",
    mid: "#ed6c02",
    bad: "#c62828",
    primary: "#1976d2",
    primaryHover: "#115293",
    caption: "#6b7280",
};

export const headerBarSx = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 1.5,
    gap: 1,
    flexWrap: "wrap",
};

export const tableContainerSx = {
    overflowX: "auto",
    borderRadius: 8,
    border: `1px solid ${palette.border}`,
};

export const tableHeadSx = {
    background: "linear-gradient(90deg, #fafbfc, #f3f4f6)",
    "& .MuiTableCell-head": {
        fontWeight: 700,
        color: "#111827",
        borderBottom: `2px solid ${palette.headBottom}`,
    },
};

export const tableRowSx = {
    "&:hover": {
        backgroundColor: palette.hoverBg,
    },
    transition: "background-color .2s ease",
};

export const countChipSx = {
    backgroundColor: palette.chipBg,
    color: palette.chipText,
    fontWeight: 700,
    height: 22,
};

export const tagChipSx = {
    backgroundColor: "#fff",
    borderColor: palette.headBottom,
    color: "#374151",
    fontWeight: 600,
    height: 22,
};

export const actionsCellSx = { whiteSpace: "nowrap" };

export function ratingColor(r) {
    if (r >= 4.5) return palette.good;
    if (r >= 3.5) return palette.mid;
    return palette.bad;
}
