<div align="center">

<img src="https://devforge-pi-one.vercel.app/logo.png" alt="DevForge" width="120" />

# DevForge

### The AI Developer Toolkit

Six powerful modules for developers. Smart contract auditing, code learning, prompt engineering, diff analysis, RFC generation, and an interactive playground — all powered by **MiMo V2.5 Pro**.

[![Live](https://img.shields.io/badge/Live-deforge--pi--one.vercel.app-blue?style=flat-square&logo=vercel&logoColor=white)](https://devforge-pi-one.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MiMo](https://img.shields.io/badge/Powered%20by-MiMo%20V2.5%20Pro-purple?style=flat-square)](https://platform.xiaomimimo.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## Modules

| Module | Route | Description |
|--------|-------|-------------|
| **AuditLens** | `/audit` | Smart contract security auditor — vulnerability reports with severity, PoC, and fixes |
| **Mentor** | `/learn` | AI code learning platform — step-by-step tutorials, concepts, quizzes |
| **PromptForge** | `/prompts` | Prompt engineering workbench — quality scores, improvements, templates |
| **DiffSense** | `/diff` | Git diff intelligence — risk scoring, breaking changes, changelogs |
| **ThreadWeaver** | `/rfc` | RFC generator — architecture, API design, migration plans |
| **Playground** | `/playground` | Interactive code playground — paste code, ask questions, get instant analysis |

## Features

- **Streaming responses** — Real-time token-by-token output powered by MiMo V2.5 Pro
- **Analysis history** — Locally saved with localStorage, recallable anytime
- **Export as Markdown** — Download any analysis result as a `.md` file
- **API documentation** — Full endpoint reference at `/docs`
- **Product changelog** — Versioned release history at `/changelog`
- **No sign-up required** — Zero friction, just paste and analyze
- **No data stored** — All processing is stateless, history stays in your browser
- **Mobile responsive** — Works on all screen sizes

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Server Components, Streaming)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) with custom design tokens
- **AI Model**: [Xiaomi MiMo V2.5 Pro](https://platform.xiaomimimo.com) (100T parameter reasoning model)
- **Icons**: [Lucide React](https://lucide.dev)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

- Node.js 18+
- A MiMo API key from [platform.xiaomimimo.com](https://platform.xiaomimimo.com)

### Installation

```bash
git clone https://github.com/XinnBlueBird/devforge.git
cd devforge
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
MIMO_API_KEY=your-mimo-api-key
MIMO_BASE_URL=https://token-plan-sgp.xiaomimimo.com/v1
MIMO_MODEL=mimo-v2.5-pro
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm start
```

## API

DevForge exposes a streaming endpoint:

```
POST /api/analyze
Content-Type: application/json
```

```json
{
  "type": "audit" | "learn" | "prompts" | "diff" | "rfc" | "playground",
  "input": "your code or text here"
}
```

Responses stream as Server-Sent Events (SSE) in OpenAI-compatible format.

See [API Documentation](https://devforge-pi-one.vercel.app/docs) for full details.

## Project Structure

```
src/
├── app/
│   ├── api/analyze/route.ts    # Streaming MiMo API proxy
│   ├── audit/page.tsx          # Smart contract auditor
│   ├── learn/page.tsx          # Code learning platform
│   ├── prompts/page.tsx        # Prompt workbench
│   ├── diff/page.tsx           # Diff intelligence
│   ├── rfc/page.tsx            # RFC generator
│   ├── playground/page.tsx     # Code playground
│   ├── docs/page.tsx           # API documentation
│   ├── changelog/page.tsx      # Product changelog
│   ├── page.tsx                # Homepage
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Design tokens + global styles
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   ├── Footer.tsx              # Site footer
│   └── AnalysisPage.tsx        # Shared analysis page component
└── lib/
    ├── api.ts                  # API client + history management
    └── prompts.ts              # System prompts for each module
```

## Submitted To

**Xiaomi MiMo 100T Grant** — Token Creator Incentive Program

## License

[MIT](LICENSE)

---

<div align="center">

Built with Next.js · Powered by MiMo V2.5 Pro · Open Source

</div>
