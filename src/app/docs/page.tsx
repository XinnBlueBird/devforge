"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border-subtle)]">
        <span className="text-[11px] text-[var(--color-text-muted)] uppercase">{lang || "code"}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-1 rounded hover:bg-white/[0.05]">
          {copied ? <Check size={13} className="text-[var(--color-success)]" /> : <Copy size={13} className="text-[var(--color-text-muted)]" />}
        </button>
      </div>
      <pre className="p-4 text-[13px] text-[var(--color-text-secondary)] overflow-x-auto leading-relaxed">{code}</pre>
    </div>
  );
}

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Documentation</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">API Documentation</h1>
            <p className="text-[15px] text-[var(--color-text-tertiary)] leading-relaxed">
              DevForge exposes a streaming API powered by MiMo V2.5 Pro. All endpoints return Server-Sent Events.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold tracking-tight mb-4">Endpoint</h2>
              <CodeBlock lang="http" code={`POST /api/analyze
Content-Type: application/json`} />

              <h3 className="text-lg font-semibold tracking-tight mt-8 mb-3">Request Body</h3>
              <CodeBlock lang="json" code={`{
  "type": "audit" | "learn" | "prompts" | "diff" | "rfc" | "playground",
  "input": "your code or text here",
  "options": {
    // optional model parameters
    "temperature": "0.7",
    "max_tokens": "8192"
  }
}`} />
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight mb-4">Module Types</h2>
              <div className="space-y-4">
                {[
                  { name: "audit", desc: "Smart contract security audit — severity ratings, PoC, remediation" },
                  { name: "learn", desc: "Code education — walkthrough, concepts, quizzes, practice" },
                  { name: "prompts", desc: "Prompt quality scoring — clarity, specificity, context, structure" },
                  { name: "diff", desc: "Diff analysis — risk score, breaking changes, changelog" },
                  { name: "rfc", desc: "RFC generation — architecture, API design, migration plan" },
                  { name: "playground", desc: "General code analysis — bugs, improvements, explanation" },
                ].map((m) => (
                  <div key={m.name} className="rounded-lg border border-[var(--color-border)] p-4">
                    <code className="text-[13px] text-[var(--color-accent)] font-mono">{m.name}</code>
                    <p className="text-[13px] text-[var(--color-text-tertiary)] mt-1">{m.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight mb-4">Example</h2>
              <CodeBlock lang="javascript" code={`const res = await fetch("/api/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "audit",
    input: contractCode,
  }),
});

const reader = res.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const text = decoder.decode(value, { stream: true });
  // Parse SSE: each line starts with "data: "
  for (const line of text.split("\n")) {
    if (line.startsWith("data: ")) {
      const json = JSON.parse(line.slice(6));
      const content = json.choices?.[0]?.delta?.content;
      if (content) process.stdout.write(content);
    }
  }
}`} />
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight mb-4">Response Format</h2>
              <p className="text-[14px] text-[var(--color-text-tertiary)] mb-4 leading-relaxed">
                Responses are streamed as Server-Sent Events (SSE). Each event contains a JSON object in OpenAI-compatible format:
              </p>
              <CodeBlock lang="json" code={`{
  "choices": [{
    "delta": {
      "content": "chunk of text..."
    }
  }]
}`} />
              <p className="text-[14px] text-[var(--color-text-tertiary)] mt-4">
                The stream ends with <code className="text-[var(--color-accent)]">data: [DONE]</code>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight mb-4">Powered By</h2>
              <div className="rounded-lg border border-[var(--color-border)] p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[14px] font-semibold">Xiaomi MiMo V2.5 Pro</span>
                  <a href="https://platform.xiaomimimo.com" target="_blank" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="text-[13px] text-[var(--color-text-tertiary)] leading-relaxed">
                  All analysis runs on Xiaomi&apos;s MiMo V2.5 Pro model, a 100T parameter reasoning model
                  optimized for code understanding, mathematical reasoning, and technical analysis.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
