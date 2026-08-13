# ThreatPulse Intelligence Hub

A real-time malware threat intelligence dashboard built with Next.js and MUI. Pulls live malware samples from the MalwareBazaar public API, scores them by threat level, and displays them in a searchable table.

## Features

- **Live Malware Feed** - Fetches recent samples from [MalwareBazaar](https://bazaar.abuse.ch/) every 5 minutes
- **Threat Scoring** - Each sample is scored 0-100 based on malware family, signature, and tags
- **Threat Classification** - Samples are classified as Critical, High, Medium, or Low
- **Threat Advisories** - Curated list of active cybersecurity campaigns and advisories
- **Dark Mode** - Full light/dark theme support

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [MUI](https://mui.com/) for UI components
- [MalwareBazaar CSV API](https://bazaar.abuse.ch/export/csv/recent/) for live threat data

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home / landing
│   ├── malware-dashboard/page.tsx  # Main threat dashboard
│   ├── news/page.tsx               # Threat advisories
│   └── api/malware-collect/        # API route - fetches & scores malware samples
├── components/Layout/              # Sidebar, topbar, footer
├── providers/LayoutProvider.tsx    # Layout wrapper
└── theme.ts                        # MUI theme config
```

## How the Threat Scoring Works

The API route (`/api/malware-collect`) fetches the MalwareBazaar recent CSV export and parses each entry. Each sample gets a base score of 20, then points are added based on keywords in the malware signature:

- Ransomware families (LockBit, BlackCat, REvil, etc.) +55
- Trojans, backdoors, RATs, stealers +40
- Adware, miners +20
- APT indicators +15, exploits +20, zero-days +25

Scores are capped at 100. Samples are then bucketed into Critical / High / Medium / Low based on the same signature patterns.

## Live App

https://threatpulse-hub-main.vercel.app
