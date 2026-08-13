import { Box, Typography, Card, CardContent, Chip } from "@mui/material";

const advisories = [
  {
    id: 1,
    title: "LockBit 3.0 Ransomware Campaign Targeting Healthcare",
    summary:
      "LockBit 3.0 operators are actively targeting healthcare organizations using phishing emails with malicious macro-enabled Office documents as the initial access vector.",
    date: "2025-08-10",
    severity: "Critical",
    source: "CISA",
  },
  {
    id: 2,
    title: "Cobalt Strike Beacon Variants Evading EDR Detection",
    summary:
      "Threat actors are distributing modified Cobalt Strike Beacon payloads that bypass common endpoint detection rules by obfuscating shellcode in PNG file metadata.",
    date: "2025-08-08",
    severity: "High",
    source: "FBI Flash",
  },
  {
    id: 3,
    title: "QakBot Resurgence via Malicious PDF Attachments",
    summary:
      "QakBot banking trojan is spreading through phishing campaigns using password-protected PDF files. Once opened, it drops a DLL that establishes persistence via scheduled tasks.",
    date: "2025-08-06",
    severity: "High",
    source: "MS-ISAC",
  },
  {
    id: 4,
    title: "XMRig Cryptominer Bundled in Fake Software Installers",
    summary:
      "Attackers are distributing XMRig-based cryptominers through fake installers of popular software tools uploaded to third-party download sites.",
    date: "2025-08-03",
    severity: "Medium",
    source: "MalwareBazaar",
  },
  {
    id: 5,
    title: "Mirai Botnet Targeting Unpatched IoT Devices",
    summary:
      "A new Mirai variant is scanning for devices running outdated firmware with exposed Telnet ports. Affected devices are enrolled into DDoS botnets.",
    date: "2025-07-30",
    severity: "Medium",
    source: "CISA",
  },
];

const severityColor = (s: string): "error" | "warning" | "info" | "default" => {
  if (s === "Critical") return "error";
  if (s === "High") return "warning";
  if (s === "Medium") return "info";
  return "default";
};

export default function NewsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Threat Advisories
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Latest cybersecurity threat advisories and active malware campaigns
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {advisories.map((item) => (
          <Card key={item.id} variant="outlined">
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mr: 2 }}>
                  {item.title}
                </Typography>
                <Chip label={item.severity} color={severityColor(item.severity)} size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {item.summary}
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Source: {item.source}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.date}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
