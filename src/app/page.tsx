import Link from 'next/link'

const features = [
  {
    icon: 'bug_report',
    title: 'Live Malware Samples',
    desc: 'Pulls recent samples from MalwareBazaar in real time. Each sample is scored and classified as Critical, High, Medium, or Low.',
  },
  {
    icon: 'security',
    title: 'Threat Scoring',
    desc: 'Scores 0–100 based on malware family, signature, and tags. Ransomware, APT tools, and zero-days rank highest.',
  },
  {
    icon: 'newspaper',
    title: 'Threat Advisories',
    desc: 'Curated cybersecurity advisories covering active threat actors, known vulnerabilities, and recommended mitigations.',
  },
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-xs text-on-muted tracking-widest mb-3">
          CYBER THREAT INTELLIGENCE PLATFORM
        </p>
        <h1 className="font-headline text-4xl font-semibold text-on-surface mb-3">
          ThreatPulse Intelligence Hub
        </h1>
        <p className="text-on-muted text-sm mb-6">
          Real-time malware analysis powered by MalwareBazaar public feed.
        </p>
        <Link
          href="/malware-dashboard"
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/40 text-primary font-mono text-xs tracking-widest px-4 py-2 hover:bg-primary/20 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">security</span>
          OPEN THREAT DASHBOARD
        </Link>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-subtle">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="bg-surface-base p-6">
            <span className="material-symbols-outlined text-primary text-[28px] mb-3 block">{icon}</span>
            <h2 className="font-headline font-semibold text-on-surface mb-2">{title}</h2>
            <p className="text-on-muted text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="mt-px bg-surface-base border-t border-border-subtle p-4 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="font-mono text-xs text-on-muted">
          FEED STATUS: ONLINE — MalwareBazaar CSV updated every 5 minutes
        </span>
      </div>
    </div>
  )
}
