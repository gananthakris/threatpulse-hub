"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <>
      <Box
        className="footer-area"
        sx={{
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "7px 7px 0 0",
          padding: "12px 25px 10px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 -5px 20px rgba(96, 93, 255, 0.1)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -30,
            left: 0,
            right: 0,
            height: "60px",
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            opacity: 0.3,
            animation: "wave 10s linear infinite"
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: -30,
            left: 0,
            right: 0,
            height: "60px",
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.15' d='M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,138.7C960,171,1056,213,1152,197.3C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            opacity: 0.3,
            animation: "wave 15s linear infinite reverse"
          },
          "@keyframes wave": {
            "0%": {
              transform: "translateX(0)"
            },
            "100%": {
              transform: "translateX(-50%)"
            }
          }
        }}
      >
        <Typography 
          sx={{ 
            color: "#fff", 
            fontWeight: 600,
            fontSize: "14px",
            position: "relative",
            zIndex: 1,
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            mb: 0.5
          }}
        >
          © 2025 <span style={{ fontWeight: 700 }}>ThreatPulse Intelligence Hub</span>
        </Typography>
        <Typography 
          sx={{ 
            color: "rgba(255, 255, 255, 0.9)", 
            fontSize: "12px",
            position: "relative",
            zIndex: 1,
            textShadow: "0 1px 2px rgba(0,0,0,0.1)"
          }}
        >
          Advanced Threat Intelligence Platform • Real-Time Malware Analysis
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
