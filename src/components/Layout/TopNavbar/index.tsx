"use client";

import React, { useEffect } from "react";
import { AppBar, Toolbar, IconButton, Box, Tooltip } from "@mui/material";
import Link from "next/link";
import DarkMode from "./DarkMode";
import FullscreenButton from "./FullscreenButton";
import Profile from "./Profile";

interface TopNavbarProps {
  toggleActive: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ toggleActive }) => {
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
      if (window.scrollY > 100) {
        navbar?.classList.add("sticky");
      } else {
        navbar?.classList.remove("sticky");
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="top-navbar-dark">
      <AppBar
        id="navbar"
        color="inherit"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "initial",
          borderRadius: "0 0 15px 15px",
          py: { xs: "15px", sm: "3px" },
          px: "0 !important",
          width: "initial",
          zIndex: 489,
        }}
        className="top-navbar"
      >
        <Box className="top-navbar-content">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box className="logos">
                <Link href="/" className="logo">
                  <Box sx={{ fontWeight: 700, fontSize: "20px", color: "#605dff" }}>
                    ThreatPulse
                  </Box>
                </Link>
                <Link href="/" className="white-logo">
                  <Box sx={{ fontWeight: 700, fontSize: "20px", color: "#fff" }}>
                    ThreatPulse
                  </Box>
                </Link>
              </Box>

              <Tooltip title="Toggle Sidebar" arrow>
                <IconButton size="small" color="inherit" onClick={toggleActive} className="top-burger">
                  <i className="material-symbols-outlined">menu</i>
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DarkMode />
              <FullscreenButton />
              <Profile />
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
};

export default TopNavbar;
