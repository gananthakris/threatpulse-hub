"use client";

import { Box, Typography, Button, Card, CardContent, Grid } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import BugReportIcon from "@mui/icons-material/BugReport";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Link from "next/link";

export default function Home() {
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          ThreatPulse Intelligence Hub
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Real-time malware threat intelligence powered by MalwareBazaar
        </Typography>
        <Link href="/malware-dashboard" style={{ textDecoration: "none" }}>
          <Button variant="contained" size="large" startIcon={<SecurityIcon />}>
            Open Threat Dashboard
          </Button>
        </Link>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <BugReportIcon color="error" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Live Malware Samples
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pulls the latest malware samples from MalwareBazaar in real time.
                Each sample is scored and classified by threat level - Critical, High, Medium, or Low.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <SecurityIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Threat Scoring
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Each sample gets a threat score based on its malware family, signature, and tags.
                Ransomware, APT tools, and zero-days rank highest.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <NewspaperIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Threat Advisories
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stay updated with the latest cybersecurity advisories covering active threat actors,
                vulnerabilities, and recommended mitigations.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
