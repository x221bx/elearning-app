// src/components/admin/AdminSidebar.jsx
import React from "react";
import { Box, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const navItem = ({ to, label }) => (
    <ListItemButton
        key={to}
        component={NavLink}
        to={to}
        sx={{
            borderRadius: 1,
            "&.active": { bgcolor: "#fff9c4" },
        }}
    >
        <ListItemText primary={label} />
    </ListItemButton>
);

export default function AdminSidebar() {
    return (
        <Box sx={{ width: 240, borderRight: "1px solid #eee", bgcolor: "#fff" }}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight={700}>Admin</Typography>
            </Box>
            <List>
                {navItem({ to: "/admin", label: "Dashboard" })}
                {navItem({ to: "/admin/courses", label: "Courses" })}
                {navItem({ to: "/admin/teachers", label: "Teachers" })}
            </List>
        </Box>
    );
}
