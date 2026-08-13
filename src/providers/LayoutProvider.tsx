'use client'

import { useState } from 'react'
import Sidebar from '@/components/Layout/Sidebar'

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-bg-deep">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border-subtle bg-surface-base sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="text-on-muted hover:text-primary">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="font-mono text-sm font-bold text-primary tracking-widest">THREATPULSE</span>
          <div className="w-6" />
        </header>

        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>

        <footer className="border-t border-border-subtle px-6 py-3 text-center">
          <p className="font-mono text-xs text-on-muted">
            © 2026 THREATPULSE INTELLIGENCE HUB
          </p>
        </footer>
      </div>
    </div>
  )
}
