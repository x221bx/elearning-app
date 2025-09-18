// src/components/admin/AdminLayout.jsx
import React from "react";
import { Box } from "@mui/material";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <Box sx={{ display: "flex", minHeight: "calc(100vh - 72px)" }}>
            <AdminSidebar />
            <Box sx={{ flex: 1, p: 3, bgcolor: "#fafafa" }}>{children}</Box>
        </Box>
    );
}
