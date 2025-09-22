// src/components/admin/AdminSidebar.jsx
import React from "react";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { alpha } from "@mui/material/styles";

const NavItem = ({ to, label, end }) => (
    <ListItemButton
        component={NavLink}
        to={to}
        end={end}
        sx={(theme) => ({
            borderRadius: 3,
            px: 2,
            py: 1,
            color: theme.palette.text.primary,
            "&:hover": {
                backgroundColor: alpha(
                    theme.palette.secondary.main,
                    theme.palette.mode === "dark" ? 0.18 : 0.1
                ),
            },
            "&.active": {
                backgroundColor: alpha(
                    theme.palette.secondary.main,
                    theme.palette.mode === "dark" ? 0.28 : 0.18
                ),
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                color: theme.palette.text.primary,
                boxShadow: theme.customShadows?.card,
                "& .MuiListItemText-primary": { fontWeight: 800 },
            },
        })}
    >
        <ListItemText primary={label} />
    </ListItemButton>
);

export default function AdminSidebar() {
    return (
        <Box
            sx={(theme) => ({
                width: "100%",
                height: "100%",
                backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.secondary.dark, theme.palette.mode === 'dark' ? 0.4 : 0.18)} 0%, ${alpha(theme.palette.secondary.dark, theme.palette.mode === 'dark' ? 0.7 : 0.28)} 100%)`,
                borderRight: `1px solid ${alpha(theme.palette.secondary.main, 0.25)}`,
                display: "flex",
                flexDirection: "column",
            })}
        >
            <Box
                sx={(theme) => ({
                    p: 2,
                    borderBottom: `1px solid ${alpha(theme.palette.secondary.main, 0.25)}`,
                })}
            >
                <Typography variant="h6" fontWeight={700}>
                    Admin
                </Typography>
            </Box>

            <List sx={{ p: 1, gap: 0.5, display: "grid" }}>
                <NavItem to="/admin" label="Dashboard" end />
                <NavItem to="/admin/courses" label="Courses" />
                <NavItem to="/admin/teachers" label="Teachers" />
            </List>
        </Box>
    );
}
