import * as React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      className="footer-area"
      sx={{ textAlign: "center", borderTop: "1px solid", borderColor: "divider", padding: "12px 25px" }}
    >
      <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
        © 2026 ThreatPulse Intelligence Hub - Real-Time Malware Analysis
      </Typography>
    </Box>
  );
};

export default Footer;
