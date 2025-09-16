"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Typography, useTheme } from "@mui/material";

interface LeftSidebarProps {
  toggleActive: () => void;
  isCollapsed?: boolean;
}

const LeftSidebarMenu: React.FC<LeftSidebarProps> = ({ toggleActive, isCollapsed = false }) => {
  const pathname = usePathname();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [isCompact, setIsCompact] = React.useState(false);

  React.useEffect(() => {
    const checkCompactMode = () => {
      const mainWrapper = document.querySelector(".main-wrapper-content");
      setIsCompact(mainWrapper?.classList.contains("compact-sidebar") || false);
    };

    checkCompactMode();
    
    // Observer to watch for class changes
    const observer = new MutationObserver(checkCompactMode);
    const mainWrapper = document.querySelector(".main-wrapper-content");
    if (mainWrapper) {
      observer.observe(mainWrapper, { attributes: true, attributeFilter: ["class"] });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Box className="leftSidebarDark hide-for-horizontal-nav">
        <Box className="left-sidebar-menu">
          <Box className="logo">
            <Link href="/" className="logo-link">
              <Typography 
                component={"span"} 
                className="logo-text"
                sx={{ 
                  color: '#605dff', 
                  fontWeight: 600,
                  display: (isCollapsed || isCompact) ? 'none' : 'inline-block'
                }}
              >
                Chill App
              </Typography>
            </Link>
          </Box>

          <Box className="burger-menu" onClick={toggleActive}>
            <Typography component={"span"} className="top-bar"></Typography>
            <Typography component={"span"} className="middle-bar"></Typography>
            <Typography component={"span"} className="bottom-bar"></Typography>
          </Box>

          <Box className="sidebar-inner">
            <Box className="sidebar-menu">
              <Typography
                className="sub-title main-menu-text"
                sx={{
                  display: (isCollapsed || isCompact) ? 'none' : 'block',
                  fontWeight: "500",
                  textTransform: "uppercase",
                  mt: 2,
                  mb: 2
                }}
              >
                MAIN MENU
              </Typography>

              {/* Home Menu Item */}
              <Box className="sidebar-single-menu" sx={{ mb: 1 }}>
                <Link
                  href="/"
                  className={`sidemenu-link ${pathname === "/" ? "active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: (isCollapsed || isCompact) ? "center" : "flex-start",
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: pathname === "/" ? "#605dff" : isDarkMode ? "#ffffff" : "#64748b",
                    background: pathname === "/" 
                      ? "linear-gradient(135deg, rgba(96, 93, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)" 
                      : "transparent",
                    borderRadius: "12px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: pathname === "/" 
                      ? "0 4px 15px rgba(96, 93, 255, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)" 
                      : "none"
                  }}
                >
                  <i 
                    className="material-symbols-outlined menu-icon" 
                    style={{ 
                      marginRight: (isCollapsed || isCompact) ? "0" : "12px", 
                      fontSize: "20px" 
                    }}
                  >
                    home
                  </i>
                  <Typography 
                    component="span" 
                    className="menu-text"
                    sx={{ 
                      fontWeight: pathname === "/" ? 600 : 400,
                      display: (isCollapsed || isCompact) ? 'none' : 'inline-block'
                    }}
                  >
                    Home
                  </Typography>
                </Link>
              </Box>

              {/* News Menu Item */}
              <Box className="sidebar-single-menu" sx={{ mb: 1 }}>
                <Link
                  href="/news"
                  className={`sidemenu-link ${pathname === "/news" ? "active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: (isCollapsed || isCompact) ? "center" : "flex-start",
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: pathname === "/news" ? "#605dff" : isDarkMode ? "#ffffff" : "#64748b",
                    background: pathname === "/news" 
                      ? "linear-gradient(135deg, rgba(96, 93, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)" 
                      : "transparent",
                    borderRadius: "12px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: pathname === "/news" 
                      ? "0 4px 15px rgba(96, 93, 255, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)" 
                      : "none"
                  }}
                >
                  <i 
                    className="material-symbols-outlined menu-icon" 
                    style={{ 
                      marginRight: (isCollapsed || isCompact) ? "0" : "12px", 
                      fontSize: "20px" 
                    }}
                  >
                    newspaper
                  </i>
                  <Typography 
                    component="span" 
                    className="menu-text"
                    sx={{ 
                      fontWeight: pathname === "/news" ? 600 : 400,
                      display: (isCollapsed || isCompact) ? 'none' : 'inline-block'
                    }}
                  >
                    News
                  </Typography>
                </Link>
              </Box>

              {/* Data Menu Item */}
              <Box className="sidebar-single-menu" sx={{ mb: 1 }}>
                <Link
                  href="/data"
                  className={`sidemenu-link ${pathname === "/data" ? "active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: pathname === "/data" ? "#605dff" : "inherit",
                    backgroundColor: pathname === "/data" ? "rgba(96, 93, 255, 0.1)" : "transparent",
                    borderRadius: "8px",
                    transition: "all 0.3s ease"
                  }}
                >
                  <i 
                    className="material-symbols-outlined" 
                    style={{ marginRight: "12px", fontSize: "20px" }}
                  >
                    database
                  </i>
                  <Typography component="span" sx={{ fontWeight: pathname === "/data" ? 600 : 400 }}>
                    Data Tables
                  </Typography>
                </Link>
              </Box>

              {/* Auth Menu Item */}
              <Box className="sidebar-single-menu" sx={{ mb: 1 }}>
                <Link
                  href="/auth"
                  className={`sidemenu-link ${pathname === "/auth" ? "active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: (isCollapsed || isCompact) ? "center" : "flex-start",
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: pathname === "/auth" ? "#605dff" : isDarkMode ? "#ffffff" : "#64748b",
                    background: pathname === "/auth" 
                      ? "linear-gradient(135deg, rgba(96, 93, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)" 
                      : "transparent",
                    borderRadius: "12px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: pathname === "/auth" 
                      ? "0 4px 15px rgba(96, 93, 255, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)" 
                      : "none"
                  }}
                >
                  <i 
                    className="material-symbols-outlined menu-icon" 
                    style={{ 
                      marginRight: (isCollapsed || isCompact) ? "0" : "12px", 
                      fontSize: "20px" 
                    }}
                  >
                    admin_panel_settings
                  </i>
                  <Typography 
                    component="span" 
                    className="menu-text"
                    sx={{ 
                      fontWeight: pathname === "/auth" ? 600 : 400,
                      display: (isCollapsed || isCompact) ? 'none' : 'inline-block'
                    }}
                  >
                    Auth Management
                  </Typography>
                </Link>
              </Box>

              {/* Future menu items will be added here by AI as features are built */}
              
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LeftSidebarMenu;