"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Typography, useTheme } from "@mui/material";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/malware-dashboard", label: "Threat Dashboard", icon: "security" },
  { href: "/news", label: "Threat Advisories", icon: "newspaper" },
];

interface Props {
  toggleActive: () => void;
  isCollapsed?: boolean;
}

const LeftSidebarMenu: React.FC<Props> = ({ toggleActive, isCollapsed = false }) => {
  const pathname = usePathname();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box className="leftSidebarDark hide-for-horizontal-nav">
      <Box className="left-sidebar-menu">
        <Box className="logo">
          <Link href="/" className="logo-link">
            <Typography
              component="span"
              className="logo-text"
              sx={{ color: "#605dff", fontWeight: 600, display: isCollapsed ? "none" : "inline-block" }}
            >
              ThreatPulse
            </Typography>
          </Link>
        </Box>

        <Box className="burger-menu" onClick={toggleActive}>
          <Typography component="span" className="top-bar" />
          <Typography component="span" className="middle-bar" />
          <Typography component="span" className="bottom-bar" />
        </Box>

        <Box className="sidebar-inner">
          <Box className="sidebar-menu">
            {!isCollapsed && (
              <Typography
                className="sub-title main-menu-text"
                sx={{ fontWeight: 500, textTransform: "uppercase", mt: 2, mb: 2 }}
              >
                MAIN MENU
              </Typography>
            )}

            {NAV_ITEMS.map(({ href, label, icon }) => {
              const active = pathname === href;
              return (
                <Box key={href} className="sidebar-single-menu" sx={{ mb: 1 }}>
                  <Link
                    href={href}
                    className={`sidemenu-link ${active ? "active" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isCollapsed ? "center" : "flex-start",
                      padding: "12px 16px",
                      textDecoration: "none",
                      color: active ? "#605dff" : isDark ? "#ffffff" : "#64748b",
                      background: active
                        ? "linear-gradient(135deg, rgba(96,93,255,0.1) 0%, rgba(124,58,237,0.1) 100%)"
                        : "transparent",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      boxShadow: active ? "0 4px 15px rgba(96,93,255,0.15)" : "none",
                    }}
                  >
                    <i
                      className="material-symbols-outlined menu-icon"
                      style={{ marginRight: isCollapsed ? 0 : "12px", fontSize: "20px" }}
                    >
                      {icon}
                    </i>
                    {!isCollapsed && (
                      <Typography component="span" className="menu-text" sx={{ fontWeight: active ? 600 : 400 }}>
                        {label}
                      </Typography>
                    )}
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSidebarMenu;
