import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import pic1 from "../../assets/images/pic1.jpg";
import LoginModal from "../Pages/login";
import RegisterModal from "../Pages/register";



function Navbar() {
  const [anchorElCourse, setAnchorElCourse] = useState(null);
  const [anchorElMobile, setAnchorElMobile] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);


  const handleOpenCourse = (event) => setAnchorElCourse(event.currentTarget);
  const handleCloseCourse = () => setAnchorElCourse(null);

  
  const handleOpenMobile = (event) => setAnchorElMobile(event.currentTarget);
  const handleCloseMobile = () => setAnchorElMobile(null);

  return (
    <>
    
      <AppBar
      
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          color: "black",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Avatar sx={{ width: 45, height: 45, mr: 1 }} src={pic1} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Edudu
            </Typography>
          </Box>


          <Box
            sx={{
              flexGrow: 2,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleOpenCourse}
              endIcon={<ArrowDropDownIcon />}
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Courses
            </Button>

            <Button sx={{ color: "black", fontWeight: "bold" }}>Teacher</Button>
            <Button sx={{ color: "black", fontWeight: "bold" }}>How to use</Button>
            <Button sx={{ color: "black", fontWeight: "bold" }}>About us</Button>
          </Box>

          {/* Desktop Login/Signup */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
          
          </Box>

          {/* Mobile Hamburger */}
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
              {/* Mobile Menu Items */}
              <MenuItem onClick={handleOpenCourse}>
                Courses <ArrowDropDownIcon fontSize="small" />
              </MenuItem>
              <Menu
                anchorEl={anchorElCourse}
                open={Boolean(anchorElCourse)}
                onClose={handleCloseCourse}
              >
                <MenuItem onClick={handleCloseCourse}>English</MenuItem>
                <MenuItem onClick={handleCloseCourse}>Arabic</MenuItem>
                <MenuItem onClick={handleCloseCourse}>Math</MenuItem>
              </Menu>

              <MenuItem onClick={handleCloseMobile}>Teacher</MenuItem>
              <MenuItem onClick={handleCloseMobile}>How to use</MenuItem>
              <MenuItem onClick={handleCloseMobile}>About us</MenuItem>
              <MenuItem onClick={() => { setOpenLogin(true); handleCloseMobile(); }}>
                Login
              </MenuItem>
              <MenuItem onClick={() => { setOpenRegister(true); handleCloseMobile(); }}>
                Sign Up
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Modals */}
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
    </>
  );
}

export default Navbar;
