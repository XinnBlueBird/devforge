import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevForge — The AI Developer Toolkit",
  description:
    "Six powerful AI modules for developers. Smart contract auditing, code learning, prompt engineering, diff analysis, RFC generation, and an interactive playground — all powered by MiMo V2.5 Pro.",
  metadataBase: new URL("https://devforge-pi-one.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  openGraph: {
    title: "DevForge — The AI Developer Toolkit",
    description:
      "Six powerful AI modules for developers. Powered by MiMo V2.5 Pro.",
    type: "website",
    images: ["/logo.png"],
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
