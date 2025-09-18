import React, { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

import pic1 from "../../assets/images/pic1.jpg";
import LoginModal from "../Pages/login";
import RegisterModal from "../Pages/register";

function Navbar() {
  const [anchorElMobile, setAnchorElMobile] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleOpenMobile = (event) => setAnchorElMobile(event.currentTarget);
  const handleCloseMobile = () => setAnchorElMobile(null);

  const handleOpenProfile = (event) => setAnchorElProfile(event.currentTarget);
  const handleCloseProfile = () => setAnchorElProfile(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleCloseProfile();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#eeed9bff",
          color: "black",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Avatar sx={{ width: 45, height: 45, mr: 1 }} src={pic1} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
            <Button component={Link} to="/" sx={{ color: "black", fontWeight: "bold" }}>
              Home
            </Button>
            <Button component={Link} to="/courses" sx={{ color: "black", fontWeight: "bold" }}>
              Courses
            </Button>
            <Button component={Link} to="/teachers" sx={{ color: "black", fontWeight: "bold" }}>
              Teachers
            </Button>
            <Button sx={{ color: "black", fontWeight: "bold" }}>How to use</Button>
            <Button sx={{ color: "black", fontWeight: "bold" }}>About us</Button>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  sx={{
                    ml: 1,
                    backgroundColor: "#ebebd2ff",
                    color: "black",
                    boxShadow: "none",
                  }}
                  onClick={() => setOpenRegister(true)}
                >
                  Sign Up
                </Button>
                <Button
                  variant="outlined"
                  sx={{ ml: 2, bgcolor: "#3e3a21ff", color: "white" }}
                  onClick={() => setOpenLogin(true)}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <IconButton onClick={handleOpenProfile} sx={{ p: 0 }}>
                  <Avatar src={pic1} />
                </IconButton>
                <Menu
                  anchorEl={anchorElProfile}
                  open={Boolean(anchorElProfile)}
                  onClose={handleCloseProfile}
                >
                  <MenuItem component={Link} to="/wishlist" onClick={handleCloseProfile}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </Menu>
              </>
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={handleOpenMobile}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElMobile}
              open={Boolean(anchorElMobile)}
              onClose={handleCloseMobile}
              keepMounted
            >
              <MenuItem component={Link} to="/" onClick={handleCloseMobile}>
                Home
              </MenuItem>
              <MenuItem component={Link} to="/courses" onClick={handleCloseMobile}>
                Courses
              </MenuItem>
              <MenuItem component={Link} to="/teachers" onClick={handleCloseMobile}>
                Teachers
              </MenuItem>
              <MenuItem onClick={handleCloseMobile}>How to use</MenuItem>
              <MenuItem onClick={handleCloseMobile}>About us</MenuItem>

              {!isLoggedIn ? (
                <>
                  <MenuItem
                    onClick={() => {
                      setOpenLogin(true);
                      handleCloseMobile();
                    }}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpenRegister(true);
                      handleCloseMobile();
                    }}
                  >
                    Sign Up
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/wishlist" onClick={handleCloseMobile}>
                    Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/cart" onClick={handleCloseMobile}>
                    logout
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setOpenLogin(false);
        }}
      />
      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        onRegisterSuccess={() => {
          setIsLoggedIn(true);
          setOpenRegister(false);
        }}
      />
    </>
  );
}

export default Navbar;