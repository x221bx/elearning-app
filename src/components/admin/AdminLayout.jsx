import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function AdminLayout({ children }) {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Box
                sx={(theme) => ({
                    flexShrink: 0,
                    width: { xs: 220, md: 240 },
                    borderRight: `1px solid ${theme.palette.divider}`,
                    bgcolor: theme.palette.background.paper,
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    overflowY: "auto",
                })}
            >
                <AdminSidebar />
            </Box>

            <Box
                component="main"
                sx={(theme) => ({
                    flex: 1,
                    minWidth: 0,
                    p: 0,
                    backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.secondary.light, theme.palette.mode === 'dark' ? 0.18 : 0.32)} 0%, ${theme.palette.background.default} 65%)`,
                    backgroundColor: theme.palette.background.default,
                })}
            >
                {/* Offset for fixed navbar */}
                <Box sx={(t) => t.mixins.toolbar} />
                <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 3, md: 5 } }}>
                    {children || <Outlet />}
                </Box>
            </Box>
        </Box>
    );
}
