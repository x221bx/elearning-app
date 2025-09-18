// src/components/common/navbar.jsx
import React, { useState } from "react";
import {
    AppBar, Box, Toolbar, Typography, Button, Menu, MenuItem,
    IconButton, Avatar, Divider, ListItemIcon, Tooltip
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

import pic1 from "../../assets/images/pic1.jpg";
import LoginModal from "../Pages/login";
import RegisterModal from "../Pages/register";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
    const navigate = useNavigate();
    const { auth, isAdmin, logout } = useAuth();

    const [anchorElMobile, setAnchorElMobile] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const user = auth?.email ? auth : null;

    const handleOpenMobile = (e) => setAnchorElMobile(e.currentTarget);
    const handleCloseMobile = () => setAnchorElMobile(null);
    const handleOpenUser = (e) => setAnchorElUser(e.currentTarget);
    const handleCloseUser = () => setAnchorElUser(null);

    const onLogout = () => {
        handleCloseUser();
        logout();
        navigate("/");
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "#fff", color: "black", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                <Toolbar>
                    {/* Brand */}
                    <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", flexGrow: 1, textDecoration: "none", color: "inherit" }}>
                        <Avatar sx={{ width: 45, height: 45, mr: 1 }} src={pic1} />
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Edudu For Kids
                        </Typography>
                    </Box>

                    {/* Center links (desktop) */}
                    <Box sx={{ flexGrow: 2, display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center", gap: 2 }}>
                        <Button component={Link} to="/" sx={{ color: "black", fontWeight: "bold" }}>Home</Button>
                        <Button component={Link} to="/courses" sx={{ color: "black", fontWeight: "bold" }}>Courses</Button>
                        <Button component={Link} to="/teachers" sx={{ color: "black", fontWeight: "bold" }}>Teachers</Button>
                        <Button sx={{ color: "black", fontWeight: "bold" }}>How to use</Button>
                        <Button sx={{ color: "black", fontWeight: "bold" }}>About us</Button>
                        {isAdmin && (
                            <Button component={Link} to="/admin" sx={{ color: "black", fontWeight: "bold" }}>
                                Dashboard
                            </Button>
                        )}
                    </Box>

                    {/* Right (desktop) */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                        {!user ? (
                            <>
                                <Button variant="contained" sx={{ ml: 1, backgroundColor: "#ebebd2ff", color: "black", boxShadow: "none" }} onClick={() => setOpenRegister(true)}>
                                    Sign Up
                                </Button>
                                <Button variant="outlined" sx={{ ml: 2, bgcolor: "#3e3a21ff", color: "white" }} onClick={() => setOpenLogin(true)}>
                                    Login
                                </Button>
                            </>
                        ) : (
                            <>
                                <Tooltip title={user.name || user.email}>
                                    <IconButton onClick={handleOpenUser} size="small">
                                        <Avatar
                                            sx={{ width: 36, height: 36, cursor: "pointer" }}
                                            onClick={() => navigate("/")}
                                        >
                                            {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUser} keepMounted>
                                    <MenuItem disabled>
                                        <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
                                        {user.name || user.email}
                                    </MenuItem>
                                    <Divider />
                                    {isAdmin && <MenuItem onClick={() => { handleCloseUser(); navigate("/admin"); }}>Admin Dashboard</MenuItem>}
                                    <MenuItem onClick={() => { handleCloseUser(); navigate("/profile"); }}>Profile</MenuItem>
                                    <Divider />
                                    <MenuItem onClick={onLogout}>
                                        <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>

                    {/* Mobile */}
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton color="inherit" onClick={handleOpenMobile}><MenuIcon /></IconButton>
                        <Menu anchorEl={anchorElMobile} open={Boolean(anchorElMobile)} onClose={handleCloseMobile} keepMounted>
                            <MenuItem component={Link} to="/" onClick={handleCloseMobile}>Home</MenuItem>
                            <MenuItem component={Link} to="/courses" onClick={handleCloseMobile}>Courses</MenuItem>
                            <MenuItem component={Link} to="/teachers" onClick={handleCloseMobile}>Teachers</MenuItem>
                            <MenuItem onClick={handleCloseMobile}>How to use</MenuItem>
                            <MenuItem onClick={handleCloseMobile}>About us</MenuItem>
                            {isAdmin && <MenuItem component={Link} to="/admin" onClick={handleCloseMobile}>Dashboard</MenuItem>}
                            {!user && <MenuItem onClick={() => { setOpenLogin(true); handleCloseMobile(); }}>Login</MenuItem>}
                            {!user && <MenuItem onClick={() => { setOpenRegister(true); handleCloseMobile(); }}>Sign Up</MenuItem>}
                            {user && <MenuItem onClick={() => { handleCloseMobile(); navigate("/profile"); }}>Profile</MenuItem>}
                            {user && <MenuItem onClick={() => { handleCloseMobile(); onLogout(); }}>Logout</MenuItem>}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Auth Modals */}
            <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
            <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
        </>
    );
}
