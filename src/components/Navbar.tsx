"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/audit", label: "AuditLens" },
  { href: "/learn", label: "Mentor" },
  { href: "/prompts", label: "PromptForge" },
  { href: "/diff", label: "DiffSense" },
  { href: "/rfc", label: "ThreadWeaver" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold group-hover:bg-[var(--color-accent-bright)] transition-colors">
            D
          </div>
          <span className="text-[15px] font-semibold tracking-tight">DevForge</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                pathname === l.href
                  ? "text-[var(--color-text)] bg-white/[0.06]"
                  : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-white/[0.03]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/XinnBlueBird/devforge"
            target="_blank"
            className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/audit"
            className="px-4 py-1.5 rounded-md bg-[var(--color-accent)] text-white text-[13px] font-medium hover:bg-[var(--color-accent-bright)] transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button className="md:hidden p-1.5" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-4 space-y-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm ${
                pathname === l.href
                  ? "text-[var(--color-text)] bg-white/[0.06]"
                  : "text-[var(--color-text-tertiary)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/audit"
            onClick={() => setOpen(false)}
            className="block mt-3 px-4 py-2 rounded-md bg-[var(--color-accent)] text-white text-sm font-medium text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
