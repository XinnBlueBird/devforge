"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Shield,
  BookOpen,
  Sparkles,
  GitCompareArrows,
  FileText,
  ArrowRight,
  Code2,
  Zap,
  Play,
  Terminal,
  ExternalLink,
  Blocks,
  Timer,
  Lock,
} from "lucide-react";

const MODULES = [
  {
    icon: Shield,
    title: "AuditLens",
    desc: "Smart contract security auditor. Get vulnerability reports with severity ratings, PoC exploits, and fixes.",
    href: "/audit",
    tag: "Security",
    color: "#ef4444",
  },
  {
    icon: BookOpen,
    title: "Mentor",
    desc: "AI code learning platform. Step-by-step tutorials, key concepts, quizzes, and practice challenges.",
    href: "/learn",
    tag: "Education",
    color: "#3b82f6",
  },
  {
    icon: Sparkles,
    title: "PromptForge",
    desc: "Prompt engineering workbench. Quality scores, improvement suggestions, and reusable templates.",
    href: "/prompts",
    tag: "AI Tools",
    color: "#8b5cf6",
  },
  {
    icon: GitCompareArrows,
    title: "DiffSense",
    desc: "Git diff intelligence. Risk scoring, breaking change detection, changelogs, and review checklists.",
    href: "/diff",
    tag: "DevOps",
    color: "#f59e0b",
  },
  {
    icon: FileText,
    title: "ThreadWeaver",
    desc: "RFC generator. Full design docs with architecture decisions, API specs, and migration plans.",
    href: "/rfc",
    tag: "Architecture",
    color: "#10b981",
  },
  {
    icon: Play,
    title: "Playground",
    desc: "Interactive code playground. Paste code, ask questions, get instant analysis and improvements.",
    href: "/playground",
    tag: "New",
    color: "#06b6d4",
  },
];

const STATS = [
  { value: "6", label: "AI Modules", icon: Blocks },
  { value: "12+", label: "Languages", icon: Code2 },
  { value: "MiMo", label: "V2.5 Pro", icon: Zap },
  { value: "0", label: "Data Stored", icon: Lock },
  { value: "< 3s", label: "Response", icon: Timer },
];

function TerminalDemo() {
  const [line, setLine] = useState(0);
  const lines = [
    { type: "cmd", text: "$ devforge audit contract.sol" },
    { type: "info", text: "Analyzing smart contract..." },
    { type: "info", text: "MiMo V2.5 Pro processing 847 lines" },
    { type: "", text: "" },
    { type: "heading", text: "## Audit Report" },
    { type: "", text: "" },
    { type: "critical", text: "CRITICAL: Reentrancy in withdraw()" },
    { type: "critical", text: "  → attacker can drain contract balance" },
    { type: "high", text: "HIGH: Missing access control on setPrice()" },
    { type: "high", text: "  → anyone can change token price" },
    { type: "medium", text: "MEDIUM: Unchecked transfer return value" },
    { type: "", text: "" },
    { type: "info", text: "Risk Score: 78/100  •  3 findings  •  2 critical" },
    { type: "success", text: "Report generated in 2.4s" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLine((prev) => (prev < lines.length ? prev + 1 : 0));
    }, 600);
    return () => clearInterval(timer);
  }, []);

  const colorMap: Record<string, string> = {
    cmd: "text-[var(--color-accent)]",
    info: "text-[var(--color-text-muted)]",
    heading: "text-[var(--color-text)] font-semibold",
    critical: "text-red-400",
    high: "text-amber-400",
    medium: "text-yellow-400",
    success: "text-emerald-400",
  };

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-border-subtle)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] text-[var(--color-text-muted)] ml-2 font-mono">
          devforge — terminal
        </span>
      </div>
      <div className="p-4 font-mono text-[12px] leading-[1.8] min-h-[280px]">
        {lines.slice(0, line).map((l, i) => (
          <div key={i} className={colorMap[l.type] || "text-[var(--color-text-muted)]"}>
            {l.text || "\u00A0"}
          </div>
        ))}
        {line < lines.length && (
          <span className="inline-block w-[7px] h-[14px] bg-[var(--color-accent)] animate-pulse ml-0.5" />
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* Navbar inline */}
      <nav className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img src="/favicon.svg" alt="DevForge" className="w-7 h-7 rounded-md group-hover:opacity-90 transition-opacity" />
            <span className="text-[15px] font-semibold tracking-tight">DevForge</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {MODULES.slice(0, 5).map((m) => (
              <Link key={m.href} href={m.href} className="px-3 py-1.5 rounded-md text-[13px] font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-white/[0.03] transition-colors">
                {m.title}
              </Link>
            ))}
            <Link href="/playground" className="px-3 py-1.5 rounded-md text-[13px] font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-white/[0.03] transition-colors">
              Playground
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/docs" className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">Docs</Link>
            <a href="https://github.com/XinnBlueBird/devforge" target="_blank" className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">GitHub</a>
            <Link href="/audit" className="px-4 py-1.5 rounded-md bg-[var(--color-accent)] text-white text-[13px] font-medium hover:bg-[var(--color-accent-bright)] transition-colors">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--color-accent)]/[0.04] blur-[160px] rounded-full" />
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-violet-600/[0.03] blur-[120px] rounded-full" />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: "radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.12), transparent), radial-gradient(1px 1px at 80px 120px, rgba(255,255,255,0.08), transparent), radial-gradient(1px 1px at 160px 60px, rgba(255,255,255,0.1), transparent)",
              backgroundSize: "220px 220px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-white/[0.02] mb-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-accent)]" />
              </span>
              <span className="text-[11px] text-[var(--color-text-tertiary)]">
                Submitted to Xiaomi MiMo 100T Grant
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6" style={{ letterSpacing: "-0.03em" }}>
              <span className="text-[var(--color-text)]">The AI developer</span>
              <br />
              <span className="text-[var(--color-text)]">toolkit </span>
              <span className="text-[var(--color-accent-bright)]">that ships.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-[var(--color-text-tertiary)] max-w-xl mb-10 leading-relaxed" style={{ fontWeight: 300 }}>
              Six powerful modules for developers. Smart contract auditing, code learning, prompt engineering, diff analysis, RFC generation, and an interactive playground — all powered by MiMo V2.5 Pro.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="/audit" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[var(--color-accent)] text-white text-[14px] font-medium hover:bg-[var(--color-accent-bright)] transition-colors">
                <Zap size={15} />
                Explore Tools
                <ArrowRight size={14} />
              </Link>
              <Link href="https://github.com/XinnBlueBird/devforge" target="_blank" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-[var(--color-border)] text-[14px] text-[var(--color-text-secondary)] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all">
                <Terminal size={15} />
                View Source
              </Link>
            </div>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3">
              {["Next.js 16", "MiMo V2.5 Pro", "Open Source · MIT", "No Sign-up"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md border border-[var(--color-border-subtle)] text-[11px] text-[var(--color-text-muted)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal demo below hero */}
          <div className="mt-16 max-w-2xl">
            <TerminalDemo />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon size={16} className="mx-auto mb-2 text-[var(--color-text-muted)]" />
                <div className="text-2xl font-bold tracking-tight">{s.value}</div>
                <div className="text-[12px] text-[var(--color-text-muted)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
              Modules
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Six tools. One platform.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((m) => (
              <Link
                key={m.title}
                href={m.href}
                className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-white/[0.15] hover:bg-[var(--color-elevated)] transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: `${m.color}15` }}>
                    <m.icon size={18} style={{ color: m.color }} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: m.color }}>
                    {m.tag}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold mb-2 group-hover:text-[var(--color-text)] transition-colors">
                  {m.title}
                </h3>
                <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                  {m.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Three steps. Zero friction.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Paste",
                desc: "Drop your code, contract, diff, or feature description into the input field. No sign-up, no API key needed.",
              },
              {
                step: "02",
                title: "Analyze",
                desc: "MiMo V2.5 Pro processes your input with deep reasoning. Results stream in real-time, token by token.",
              },
              {
                step: "03",
                title: "Act",
                desc: "Get actionable insights — vulnerability fixes, improved code, risk assessments, and design docs. Export as Markdown.",
              },
            ].map((s) => (
              <div key={s.step} className="relative">
                <span className="text-[64px] font-bold text-white/[0.03] absolute -top-6 -left-1 select-none" style={{ letterSpacing: "-0.04em" }}>
                  {s.step}
                </span>
                <div className="relative pt-2">
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
              Built With
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Modern stack. Production ready.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Next.js 16", desc: "React framework with App Router, server components, and streaming" },
              { name: "MiMo V2.5 Pro", desc: "Xiaomi's 100T parameter model with advanced reasoning capabilities" },
              { name: "Tailwind CSS 4", desc: "Utility-first CSS with zero-config setup and custom design tokens" },
              { name: "TypeScript", desc: "Full type safety across components, API routes, and shared utilities" },
            ].map((t) => (
              <div key={t.name} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <h4 className="text-[14px] font-semibold mb-2">{t.name}</h4>
                <p className="text-[12px] text-[var(--color-text-muted)] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            Build smarter. Ship faster.
          </h2>
          <p className="text-[15px] text-[var(--color-text-muted)] mb-10 max-w-md mx-auto">
            Free, fast, no sign-up required. Powered by MiMo V2.5 Pro.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[var(--color-accent)] text-white text-[14px] font-medium hover:bg-[var(--color-accent-bright)] transition-colors"
          >
            Get Started <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/favicon.svg" alt="DevForge" className="w-7 h-7 rounded-md" />
                <span className="text-[15px] font-semibold tracking-tight">DevForge</span>
              </div>
              <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed max-w-xs">
                The AI developer toolkit. Six modules powered by MiMo V2.5 Pro.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Modules</h4>
              <ul className="space-y-2.5">
                {MODULES.map((m) => (
                  <li key={m.href}>
                    <Link href={m.href} className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
                      {m.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2.5">
                <li><Link href="/docs" className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">API Docs</Link></li>
                <li><Link href="/changelog" className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">Changelog</Link></li>
                <li><a href="https://github.com/XinnBlueBird/devforge" target="_blank" className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Connect</h4>
              <ul className="space-y-2.5">
                <li><a href="https://x.com/Xinnsky" target="_blank" className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">@Xinnsky</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-[var(--color-text-muted)]">&copy; {new Date().getFullYear()} DevForge. Open source under MIT License.</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] pulse-dot" />
              <span className="text-[12px] text-[var(--color-text-muted)]">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
