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
            borderRadius: 1.5,
            px: 2,
            py: 1,
            color: theme.palette.text.primary,
            "&:hover": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.mode === "dark" ? 0.12 : 0.08
                ),
            },
             "&.active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.mode === "dark" ? 0.22 : 0.16
                ),
                color:
                    theme.palette.mode === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.primary.dark,
                "& .MuiListItemText-primary": { fontWeight: 700 },
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
                backgroundColor: theme.palette.background.paper,
                borderRight: `1px solid ${theme.palette.divider}`,
                display: "flex",
                flexDirection: "column",
            })}
        >
            <Box
                sx={(theme) => ({
                    p: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
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
