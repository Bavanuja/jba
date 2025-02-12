import { useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest User",
    profilePic: "/default-avatar.png",
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      
      <AppBar position="fixed" sx={{ backgroundColor: "#1976D2", px: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
         
          <Typography variant="h6" sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/")}>
            TalentTrack
          </Typography>

          
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button color="inherit" onClick={() => navigate("/home")}>Home</Button>
            <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button color="inherit" onClick={() => navigate("/")}>Logout</Button>

            
            <Avatar 
              alt="User" 
              src={storedUser.profilePic} 
              sx={{ cursor: "pointer" }} 
              onClick={handleMenuOpen} 
            />
            
            
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
                View Profile
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      
      <Box sx={{ mt: 8 }} />
    </>
  );
}

export default Navbar;
