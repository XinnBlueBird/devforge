import Link from "next/link";

const MODULES = [
  { href: "/audit", label: "AuditLens" },
  { href: "/learn", label: "Mentor" },
  { href: "/prompts", label: "PromptForge" },
  { href: "/diff", label: "DiffSense" },
  { href: "/rfc", label: "ThreadWeaver" },
  { href: "/playground", label: "Playground" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold">
                D
              </div>
              <span className="text-[15px] font-semibold tracking-tight">DevForge</span>
            </div>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed max-w-xs">
              The AI developer toolkit. Six modules powered by MiMo V2.5 Pro.
              Open source, free, no sign-up required.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
              Modules
            </h4>
            <ul className="space-y-2.5">
              {MODULES.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/docs" className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <a href="https://github.com/XinnBlueBird/devforge" target="_blank" className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://x.com/Xinnsky" target="_blank" className="text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
                  @Xinnsky
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} DevForge. Open source under MIT License.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] pulse-dot" />
            <span className="text-[12px] text-[var(--color-text-muted)]">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
