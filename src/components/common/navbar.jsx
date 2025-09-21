import React, { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    IconButton,
    Avatar,
    Divider,
    Tooltip,
    Badge,
    ListItemIcon,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PublicIcon from "@mui/icons-material/Public";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate, useLocation } from "react-router-dom";

import pic1 from "../../assets/images/pic1.jpg";
import LoginModal from "../Pages/login";
import RegisterModal from "../Pages/register";
import useAuth, { isAdmin } from "../../hooks/useAuth";
import useWishlist from "../../hooks/useWishlist";
import useCart from "../../hooks/useCart";
import useEnrollment from "../../hooks/useEnrollment";
import {useThemeMode} from "../../theme/ThemeProvider";
import { getLang, setLang, applyDir } from "../../utils/lang";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const { mode, toggleMode } = useThemeMode();
    const { auth, logout } = useAuth();
    const { wishlistItems } = useWishlist();
    const { cartItems } = useCart();
    const { enrolledCourses } = useEnrollment();
    const user = auth?.email ? auth : null;

    const safeWishlistItems = wishlistItems || [];
    const safeCartItems = cartItems || [];
    const wishlistCount = safeWishlistItems.filter(
        (id) => !(enrolledCourses || []).includes(id)
    ).length;

    const [anchorElMobile, setAnchorElMobile] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElLanguage, setAnchorElLanguage] = useState(null);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    // ✅ state خفيف لإجبار إعادة الرسم بعد تغيير اللغة بدون تأثير خارجي
    const [langState, setLangState] = useState(getLang() || "en");

    const handleOpenMobile = (e) => setAnchorElMobile(e.currentTarget);
    const handleCloseMobile = () => setAnchorElMobile(null);
    const handleOpenUser = (e) => setAnchorElUser(e.currentTarget);
    const handleCloseUser = () => setAnchorElUser(null);

    const handleOpenLanguage = (e) => setAnchorElLanguage(e.currentTarget);
    const handleCloseLanguage = () => setAnchorElLanguage(null);

    const onLogout = () => {
        handleCloseUser();
        logout();
        navigate("/");
    };


    const applyLanguage = (lng) => {
        const v = lng === "ar" ? "ar" : "en";
        setLang(v);
        applyDir(v);
        setLangState(v);
    };

     useEffect(() => {
        applyLanguage(getLang() || "en");

    }, []);

    const navButtonSx = {
        fontWeight: 600,
        color: "text.primary",
        "&.active": {
            color: theme.palette.primary.main,
        },
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: theme.customShadows?.card,
                }}
            >
                <Toolbar sx={{ gap: 2 }}>
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexGrow: 1,
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <Avatar sx={{ width: 44, height: 44, mr: 1 }} src={pic1} />
                        <Typography variant="h6" fontWeight={700}>
                            Edudu For Kids
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 2,
                            display: { xs: "none", md: "flex" },
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Button component={Link} to="/" sx={navButtonSx}>Home</Button>
                        <Button component={Link} to="/courses" sx={navButtonSx}>Courses</Button>
                        <Button component={Link} to="/teachers" sx={navButtonSx}>Teachers</Button>
                        <Button component={Link} to="/how-to-use" sx={navButtonSx}>How to use</Button>
                        <Button component={Link} to="/about" sx={navButtonSx}>About us</Button>
                        {isAdmin() && (
                            <Button component={Link} to="/admin" sx={navButtonSx}>Dashboard</Button>
                        )}

                        <Tooltip title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}>
                            <IconButton onClick={toggleMode} color="inherit" sx={{ ml: 1 }}>
                                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* Desktop actions */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.25 }}>
                        {/* Language switcher - always visible */}
                        <Tooltip title="Change language">
                            <IconButton
                                aria-label="Change language"
                                onClick={handleOpenLanguage}
                                size="small"
                                sx={{ ml: 0.5 }}
                            >
                                <PublicIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorElLanguage}
                            open={Boolean(anchorElLanguage)}
                            onClose={handleCloseLanguage}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            keepMounted
                        >
                            <MenuItem
                                onClick={() => { applyLanguage("en"); handleCloseLanguage(); }}
                                selected={langState === "en"}
                            >
                                English (EN)
                            </MenuItem>
                            <MenuItem
                                onClick={() => { applyLanguage("ar"); handleCloseLanguage(); }}
                                selected={langState === "ar"}
                            >
                                العربية (AR)
                            </MenuItem>
                        </Menu>

                        {user ? (
                            <>
                                <IconButton
                                    component={Link}
                                    to="/wishlist"
                                    aria-label="Wishlist"
                                    size="small"
                                    color={location.pathname === "/wishlist" ? "secondary" : "default"}
                                    sx={{ "&:hover": { color: "secondary.main" } }}
                                >
                                    <Badge badgeContent={wishlistCount} color="secondary" max={99}>
                                        {location.pathname === "/wishlist" ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </Badge>
                                </IconButton>

                                <IconButton
                                    component={Link}
                                    to="/cart"
                                    aria-label="Cart"
                                    size="small"
                                    color={location.pathname === "/cart" ? "primary" : "default"}
                                    sx={{ "&:hover": { color: "primary.main" } }}
                                >
                                    <Badge badgeContent={safeCartItems.length} color="primary" max={99}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>


                                <Tooltip title={user.name || user.email}>
                                    <IconButton onClick={handleOpenUser} size="small">
                                        <Avatar sx={{ width: 36, height: 36 }}>
                                            {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        boxShadow: "none",
                                        color: theme.palette.primary.contrastText,
                                    }}
                                    onClick={() => setOpenRegister(true)}
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ ml: 1 }}
                                    onClick={() => setOpenLogin(true)}
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </Box>

                    {/* Mobile menu */}
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton color="inherit" onClick={handleOpenMobile}><MenuIcon /></IconButton>
                        <Menu anchorEl={anchorElMobile} open={Boolean(anchorElMobile)} onClose={handleCloseMobile} keepMounted>
                            <MenuItem component={Link} to="/" onClick={handleCloseMobile}>Home</MenuItem>
                            <MenuItem component={Link} to="/courses" onClick={handleCloseMobile}>Courses</MenuItem>
                            <MenuItem component={Link} to="/teachers" onClick={handleCloseMobile}>Teachers</MenuItem>
                            <MenuItem component={Link} to="/how-to-use" onClick={handleCloseMobile}>How to use</MenuItem>
                            <MenuItem component={Link} to="/about" onClick={handleCloseMobile}>About us</MenuItem>
                            {isAdmin() && <MenuItem component={Link} to="/admin" onClick={handleCloseMobile}>Dashboard</MenuItem>}
                            <Divider />
                            <MenuItem onClick={() => { applyLanguage("en"); handleCloseMobile(); }}>
                                English (EN)
                            </MenuItem>
                            <MenuItem onClick={() => { applyLanguage("ar"); handleCloseMobile(); }}>
                                العربية (AR)
                            </MenuItem>
                            <Divider />
                            {!user && <MenuItem onClick={() => { setOpenLogin(true); handleCloseMobile(); }}>Login</MenuItem>}
                            {!user && <MenuItem onClick={() => { setOpenRegister(true); handleCloseMobile(); }}>Sign Up</MenuItem>}
                            {user && <MenuItem onClick={() => { handleCloseMobile(); navigate("/profile"); }}>Profile</MenuItem>}
                            {user && <MenuItem onClick={() => { handleCloseMobile(); onLogout(); }}>Logout</MenuItem>}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/*   User menu   */}
            <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUser}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
            >
                <MenuItem onClick={() => { handleCloseUser(); navigate("/profile"); }}>
                    <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
                    Profile
                </MenuItem>

                {isAdmin() && (
                    <MenuItem onClick={() => { handleCloseUser(); navigate("/admin"); }}>
                        <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
                        Admin Dashboard
                    </MenuItem>
                )}

                <Divider />

                <MenuItem onClick={onLogout}>
                    <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

            <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
            <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
        </>
    );
}
