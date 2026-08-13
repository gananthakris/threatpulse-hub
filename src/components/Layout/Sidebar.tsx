'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: 'HOME', icon: 'home' },
  { href: '/malware-dashboard', label: 'THREATS', icon: 'security' },
  { href: '/news', label: 'ADVISORIES', icon: 'newspaper' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname()

  return (
    <nav
      className={`fixed top-0 left-0 h-full w-64 bg-surface-base border-r border-border-subtle z-40 flex flex-col
        transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border-subtle">
        <h1 className="font-headline font-semibold text-primary text-lg tracking-tight">
          THREATPULSE
        </h1>
        <p className="font-mono text-xs text-on-muted mt-0.5">INTEL HUB v1.0</p>
      </div>

      {/* Nav items */}
      <ul className="flex-1 py-4 px-3 flex flex-col gap-1">
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 text-xs font-mono tracking-widest transition-colors border-l-2
                  ${active
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-on-muted hover:text-on-surface hover:bg-surface-low'
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">{icon}</span>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="p-4 border-t border-border-subtle">
        <p className="font-mono text-xs text-on-muted text-center">
          Data: MalwareBazaar
        </p>
      </div>
    </nav>
  )
}
