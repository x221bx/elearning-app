import React from "react";
import { Box, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, label, end }) => (
    <ListItemButton
        component={NavLink}
        to={to}
        end={end}
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
        <Box sx={{ width: "100%", bgcolor: "#fff" }}>
            <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
                <Typography variant="h6" fontWeight={700}>Admin</Typography>
            </Box>
            <List sx={{ p: 1 }}>
                <NavItem to="/admin" label="Dashboard" end />
                <NavItem to="/admin/courses" label="Courses" />
                <NavItem to="/admin/teachers" label="Teachers" />
            </List>
        </Box>
    );
}
