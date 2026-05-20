import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ENTRIES = [
  {
    version: "1.2.0",
    date: "May 20, 2026",
    tag: "Latest",
    changes: [
      { type: "new", text: "Code Playground — interactive code analysis with Q&A" },
      { type: "new", text: "API Documentation page with full endpoint reference" },
      { type: "new", text: "Export analysis results as Markdown files" },
      { type: "new", text: "Analysis history with localStorage persistence" },
      { type: "new", text: "Word and character count on all inputs" },
      { type: "improved", text: "Complete UI redesign — Linear-inspired dark theme" },
      { type: "improved", text: "Better mobile responsiveness across all pages" },
      { type: "improved", text: "Streaming responses with animated cursor" },
    ],
  },
  {
    version: "1.1.0",
    date: "May 19, 2026",
    changes: [
      { type: "new", text: "ThreadWeaver — RFC/Design Doc generator" },
      { type: "new", text: "DiffSense — Git diff intelligence with risk scoring" },
      { type: "improved", text: "AuditLens severity detection accuracy" },
      { type: "improved", text: "Mentor quiz generation quality" },
    ],
  },
  {
    version: "1.0.0",
    date: "May 18, 2026",
    changes: [
      { type: "new", text: "AuditLens — Smart contract security auditor" },
      { type: "new", text: "Mentor — AI code learning platform" },
      { type: "new", text: "PromptForge — Prompt engineering workbench" },
      { type: "new", text: "MiMo V2.5 Pro streaming API integration" },
      { type: "new", text: "Dark theme with responsive design" },
    ],
  },
];

const TAG_COLORS: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400",
  improved: "bg-emerald-500/10 text-emerald-400",
  fixed: "bg-amber-500/10 text-amber-400",
  removed: "bg-red-500/10 text-red-400",
};

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Changelog
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">What&apos;s New</h1>
            <p className="text-[15px] text-[var(--color-text-tertiary)] leading-relaxed">
              Latest updates and improvements to DevForge.
            </p>
          </div>

          <div className="space-y-0">
            {ENTRIES.map((entry, i) => (
              <div key={entry.version} className="relative pl-8 pb-12">
                {/* Timeline line */}
                {i < ENTRIES.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-px bg-[var(--color-border)]" />
                )}
                {/* Dot */}
                <div className={`absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center ${
                  entry.tag === "Latest"
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/20"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    entry.tag === "Latest" ? "bg-[var(--color-accent)]" : "bg-[var(--color-text-muted)]"
                  }`} />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-semibold tracking-tight">v{entry.version}</h2>
                  {entry.tag && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                      {entry.tag}
                    </span>
                  )}
                  <span className="text-[13px] text-[var(--color-text-muted)]">{entry.date}</span>
                </div>

                <ul className="space-y-2">
                  {entry.changes.map((c, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className={`mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 ${TAG_COLORS[c.type] || ""}`}>
                        {c.type}
                      </span>
                      <span className="text-[13px] text-[var(--color-text-tertiary)] leading-relaxed">
                        {c.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
