import './globals.css'
import type { Metadata } from 'next'
import LayoutProvider from '@/providers/LayoutProvider'

export const metadata: Metadata = {
  title: 'ThreatPulse Intelligence Hub',
  description: 'Real-time malware threat intelligence powered by MalwareBazaar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;600&family=Inter:wght@400&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-deep text-on-surface font-sans antialiased">
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  )
}
