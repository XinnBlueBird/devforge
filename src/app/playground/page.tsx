"use client";

import { useState, useRef } from "react";
import { Play, Copy, Check, Loader2, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { analyze } from "@/lib/api";

export default function PlaygroundPage() {
  const [code, setCode] = useState(`// Try some code...
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`);
  const [question, setQuestion] = useState("");
  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRun = async () => {
    if (!code.trim() || streaming) return;
    setOutput("");
    setStreaming(true);

    const prompt = question
      ? `Here is my code:\n\n\`\`\`\n${code}\n\`\`\`\n\n${question}`
      : `Here is my code. Analyze it — find bugs, suggest improvements, and explain what it does:\n\n\`\`\`\n${code}\n\`\`\``;

    try {
      await analyze({ type: "playground", input: prompt }, (chunk) => {
        setOutput((prev) => prev + chunk);
        if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
      });
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : "Analysis failed"}`);
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Playground
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Code Playground</h1>
            <p className="text-[15px] text-[var(--color-text-tertiary)] max-w-2xl leading-relaxed">
              Paste code, ask questions, get instant analysis. Great for debugging, learning, and exploring code patterns.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Code Editor */}
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-subtle)]">
                <span className="text-[12px] font-medium text-[var(--color-text-muted)]">Code</span>
                <button
                  onClick={() => { setCode(""); setOutput(""); setQuestion(""); }}
                  className="p-1.5 rounded-md hover:bg-white/[0.05] transition-colors"
                >
                  <RotateCcw size={13} className="text-[var(--color-text-muted)]" />
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 min-h-[350px] w-full p-4 bg-transparent text-[13px] text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-muted)] resize-none focus:outline-none leading-relaxed"
                spellCheck={false}
              />
              <div className="px-4 py-3 border-t border-[var(--color-border-subtle)] space-y-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question about this code (optional)..."
                  className="w-full bg-transparent text-[13px] text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                  onKeyDown={(e) => { if (e.key === "Enter") handleRun(); }}
                />
                <button
                  onClick={handleRun}
                  disabled={!code.trim() || streaming}
                  className="flex items-center gap-2 px-5 py-2 rounded-md text-[13px] font-medium text-white bg-cyan-600 hover:bg-cyan-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {streaming ? (
                    <><Loader2 size={14} className="animate-spin" /> Analyzing...</>
                  ) : (
                    <><Play size={14} /> Analyze Code</>
                  )}
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-subtle)]">
                <span className="text-[12px] font-medium text-[var(--color-text-muted)]">
                  {streaming ? (
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] pulse-dot" />
                      Analyzing...
                    </span>
                  ) : "Analysis"}
                </span>
                {output && !streaming && (
                  <button
                    onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    className="p-1.5 rounded-md hover:bg-white/[0.05] transition-colors"
                  >
                    {copied ? <Check size={14} className="text-[var(--color-success)]" /> : <Copy size={14} className="text-[var(--color-text-muted)]" />}
                  </button>
                )}
              </div>
              <div ref={outputRef} className="flex-1 min-h-[350px] p-5 overflow-y-auto">
                {output ? (
                  <pre className="text-[13px] text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed">
                    {output}
                    {streaming && <span className="inline-block w-1.5 h-4 bg-cyan-500 ml-0.5 animate-pulse" />}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-[13px] text-[var(--color-text-muted)]">
                      Results will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
