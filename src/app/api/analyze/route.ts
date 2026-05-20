import { NextRequest } from "next/server";
import { SYSTEM_PROMPTS } from "@/lib/prompts";

const MIMO_URL = process.env.MIMO_BASE_URL || "https://token-plan-sgp.xiaomimimo.com/v1";
const MIMO_KEY = process.env.MIMO_API_KEY || "";
const MIMO_MODEL = process.env.MIMO_MODEL || "mimo-v2.5-pro";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  const { type, input, options } = await req.json();

  if (!input?.trim()) {
    return new Response("Input required", { status: 400 });
  }

  const systemPrompt = SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.playground;

  const body = {
    model: MIMO_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: input },
    ],
    stream: true,
    max_tokens: 8192,
    temperature: 0.7,
    ...options,
  };

  try {
    const upstream = await fetch(`${MIMO_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": MIMO_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error("MiMo error:", upstream.status, errText);
      return new Response(
        JSON.stringify({ error: `MiMo API error: ${upstream.status}` }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
