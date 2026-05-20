export type AnalysisType = "audit" | "learn" | "prompts" | "diff" | "rfc" | "playground";

export interface AnalysisRequest {
  type: AnalysisType;
  input: string;
  options?: Record<string, string>;
}

export async function analyze(
  req: AnalysisRequest,
  onChunk: (chunk: string) => void
): Promise<void> {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  if (!res.ok || !res.body) {
    const err = await res.text();
    throw new Error(err || "Analysis failed");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") return;
        try {
          const json = JSON.parse(data);
          const content =
            json.choices?.[0]?.delta?.content ??
            json.choices?.[0]?.delta?.reasoning_content ??
            "";
          if (content) onChunk(content);
        } catch {}
      }
    }
  }
}

export function getSavedHistory(type: AnalysisType): { id: string; input: string; output: string; ts: number }[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`devforge_history_${type}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHistory(type: AnalysisType, input: string, output: string) {
  if (typeof window === "undefined") return;
  try {
    const history = getSavedHistory(type);
    history.unshift({ id: crypto.randomUUID(), input: input.slice(0, 200), output, ts: Date.now() });
    localStorage.setItem(`devforge_history_${type}`, JSON.stringify(history.slice(0, 50)));
  } catch {}
}
