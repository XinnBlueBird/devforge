"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Copy, Check, Download, RotateCcw, Clock, Trash2, ChevronRight, Loader2 } from "lucide-react";
import { analyze, getSavedHistory, saveHistory, type AnalysisType } from "@/lib/api";

interface HistoryItem {
  id: string;
  input: string;
  output: string;
  ts: number;
}

interface Props {
  type: AnalysisType;
  title: string;
  description: string;
  placeholder: string;
  sampleInput?: string;
  accentColor?: string;
}

export default function AnalysisPage({
  type,
  title,
  description,
  placeholder,
  sampleInput,
  accentColor = "var(--color-accent)",
}: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setHistory(getSavedHistory(type));
  }, [type]);

  const autoScroll = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  const handleAnalyze = async () => {
    if (!input.trim() || streaming) return;
    setOutput("");
    setError("");
    setStreaming(true);

    try {
      await analyze({ type, input }, (chunk) => {
        setOutput((prev) => prev + chunk);
        autoScroll();
      });
      saveHistory(type, input, output + "");
      setHistory(getSavedHistory(type));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setStreaming(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devforge-${type}-analysis.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const loadFromHistory = (item: HistoryItem) => {
    setInput(item.input);
    setOutput(item.output);
    setShowHistory(false);
  };

  const deleteHistory = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    localStorage.setItem(`devforge_history_${type}`, JSON.stringify(updated));
    setHistory(updated);
  };

  const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
  const charCount = input.length;

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: accentColor }}
            />
            <span className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              {type}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-[15px] text-[var(--color-text-tertiary)] max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Main panel */}
          <div className="space-y-4">
            {/* Input */}
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-subtle)]">
                <span className="text-[12px] font-medium text-[var(--color-text-muted)]">
                  Input
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[var(--color-text-muted)]">
                    {charCount} chars · {wordCount} words
                  </span>
                  {sampleInput && (
                    <button
                      onClick={() => setInput(sampleInput)}
                      className="text-[11px] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                    >
                      Load sample
                    </button>
                  )}
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="w-full h-64 p-4 bg-transparent text-[13px] text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-muted)] resize-none focus:outline-none leading-relaxed"
                spellCheck={false}
              />
              <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)]/40">
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] text-[var(--color-text-muted)] hover:text-[var(--color-text-tertiary)] hover:bg-white/[0.03] transition-colors"
                >
                  <RotateCcw size={12} />
                  Clear
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={!input.trim() || streaming}
                  className="flex items-center gap-2 px-5 py-2 rounded-md text-[13px] font-medium text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: accentColor }}
                >
                  {streaming ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze
                      <ChevronRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output */}
            {(output || error || streaming) && (
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden animate-fade-in">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-subtle)]">
                  <span className="text-[12px] font-medium text-[var(--color-text-muted)]">
                    {streaming ? (
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] pulse-dot" />
                        Streaming...
                      </span>
                    ) : (
                      "Output"
                    )}
                  </span>
                  {output && !streaming && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-md hover:bg-white/[0.05] transition-colors"
                        title="Copy"
                      >
                        {copied ? (
                          <Check size={14} className="text-[var(--color-success)]" />
                        ) : (
                          <Copy size={14} className="text-[var(--color-text-muted)]" />
                        )}
                      </button>
                      <button
                        onClick={handleExport}
                        className="p-1.5 rounded-md hover:bg-white/[0.05] transition-colors"
                        title="Export Markdown"
                      >
                        <Download size={14} className="text-[var(--color-text-muted)]" />
                      </button>
                    </div>
                  )}
                </div>
                <div
                  ref={outputRef}
                  className="p-5 max-h-[500px] overflow-y-auto"
                >
                  {error ? (
                    <p className="text-[13px] text-red-400">{error}</p>
                  ) : (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <pre className="text-[13px] text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed font-[var(--font-sans)]">
                        {output}
                        {streaming && <span className="inline-block w-1.5 h-4 bg-[var(--color-accent)] ml-0.5 animate-pulse" />}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* History */}
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
              >
                <span className="flex items-center gap-2 text-[12px] font-medium text-[var(--color-text-muted)]">
                  <Clock size={13} />
                  Recent ({history.length})
                </span>
                <ChevronRight
                  size={14}
                  className={`text-[var(--color-text-muted)] transition-transform ${showHistory ? "rotate-90" : ""}`}
                />
              </button>
              {showHistory && (
                <div className="border-t border-[var(--color-border-subtle)] max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="px-4 py-6 text-[12px] text-[var(--color-text-muted)] text-center">
                      No history yet
                    </p>
                  ) : (
                    history.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-2 px-4 py-3 border-b border-[var(--color-border-subtle)] last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer group"
                        onClick={() => loadFromHistory(item)}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] text-[var(--color-text-tertiary)] truncate">
                            {item.input}
                          </p>
                          <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
                            {new Date(item.ts).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteHistory(item.id);
                          }}
                          className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-white/[0.05] transition-all"
                        >
                          <Trash2 size={12} className="text-[var(--color-text-muted)]" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Info card */}
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <h4 className="text-[12px] font-semibold text-[var(--color-text-secondary)] mb-2">
                Powered by MiMo V2.5 Pro
              </h4>
              <p className="text-[12px] text-[var(--color-text-muted)] leading-relaxed">
                All analysis runs on Xiaomi&apos;s MiMo V2.5 Pro model. No data is stored on servers. History is saved locally in your browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
