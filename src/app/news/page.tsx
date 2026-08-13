const advisories = [
  {
    id: 1,
    title: 'LockBit 3.0 Ransomware Targeting Healthcare',
    summary:
      'LockBit 3.0 operators are actively targeting healthcare organizations using phishing emails with macro-enabled Office documents as the initial access vector.',
    date: '2025-08-10',
    severity: 'CRITICAL',
    source: 'CISA',
  },
  {
    id: 2,
    title: 'Cobalt Strike Beacon Variants Evading EDR',
    summary:
      'Threat actors distributing modified Cobalt Strike Beacon payloads that bypass common endpoint detection rules by obfuscating shellcode in PNG file metadata.',
    date: '2025-08-08',
    severity: 'HIGH',
    source: 'FBI Flash',
  },
  {
    id: 3,
    title: 'QakBot Resurgence via Malicious PDF Attachments',
    summary:
      'QakBot banking trojan spreading through phishing campaigns using password-protected PDFs. Once opened, drops a DLL that establishes persistence via scheduled tasks.',
    date: '2025-08-06',
    severity: 'HIGH',
    source: 'MS-ISAC',
  },
  {
    id: 4,
    title: 'XMRig Cryptominer in Fake Software Installers',
    summary:
      'XMRig-based cryptominers distributed through fake installers of popular software tools uploaded to third-party download sites.',
    date: '2025-08-03',
    severity: 'MEDIUM',
    source: 'MalwareBazaar',
  },
  {
    id: 5,
    title: 'Mirai Botnet Targeting Unpatched IoT Devices',
    summary:
      'New Mirai variant scanning for devices with outdated firmware and exposed Telnet ports. Affected devices enrolled into DDoS botnets.',
    date: '2025-07-30',
    severity: 'MEDIUM',
    source: 'CISA',
  },
]

const severityStyle: Record<string, string> = {
  CRITICAL: 'text-critical border-critical/50 bg-critical/10',
  HIGH: 'text-warning border-warning/50 bg-warning/10',
  MEDIUM: 'text-primary border-primary/50 bg-primary/10',
  LOW: 'text-success border-success/50 bg-success/10',
}

export default function AdvisoriesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="font-mono text-xs text-on-muted tracking-widest mb-2">THREAT FEED</p>
        <h1 className="font-headline text-3xl font-semibold text-on-surface">Threat Advisories</h1>
        <p className="text-on-muted text-sm mt-1">Active campaigns and cybersecurity advisories</p>
      </div>

      <div className="flex flex-col gap-px bg-border-subtle">
        {advisories.map((item) => (
          <div key={item.id} className="bg-surface-base p-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="font-headline font-semibold text-on-surface text-sm leading-snug">
                {item.title}
              </h2>
              <span
                className={`font-mono text-[10px] tracking-widest border px-2 py-0.5 shrink-0 ${severityStyle[item.severity]}`}
              >
                {item.severity}
              </span>
            </div>
            <p className="text-on-muted text-xs leading-relaxed mb-3">{item.summary}</p>
            <div className="flex gap-4 font-mono text-[10px] text-on-muted tracking-widest">
              <span>SRC: {item.source}</span>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
