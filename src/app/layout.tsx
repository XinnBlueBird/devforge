import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevForge — The AI Developer Toolkit",
  description:
    "Five powerful AI modules for developers. Smart contract auditing, code learning, prompt engineering, diff analysis, and RFC generation — all powered by MiMo V2.5 Pro.",
  metadataBase: new URL("https://devforge-pi-one.vercel.app"),
  openGraph: {
    title: "DevForge — The AI Developer Toolkit",
    description:
      "Five powerful AI modules for developers. Powered by MiMo V2.5 Pro.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
