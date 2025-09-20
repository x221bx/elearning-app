import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Box } from "@mui/material";

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
                sx={{
                    flex: 1,
                    minWidth: 0,
                    p: { xs: 1.5, sm: 2 },
                }}
            >
                {children || <Outlet />}
            </Box>
        </Box>
    );
}
