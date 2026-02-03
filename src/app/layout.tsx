import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "ASCEND — AI Career Intelligence Platform",
    template: "%s | ASCEND",
  },
  description:
    "AI-powered skill analysis, gap visualization, and personalized learning paths. Transform your career trajectory with data-driven insights.",
  keywords: [
    "AI Career Coach",
    "Skill Mapping",
    "Career Intelligence",
    "Tech Career Roadmap",
    "Interview Preparation",
    "Resume Analysis",
    "Job Matching AI",
  ],
  authors: [{ name: "Arjun Sharma", url: "https://heyarjun.me" }],
  creator: "Arjun Sharma",
  publisher: "Tambo AI",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://ascend-skillmap.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "ASCEND — AI Career Intelligence Platform",
    description:
      "Architect your future with AI. Deep skill analysis, visual roadmaps, and precision execution plans for your tech career.",
    siteName: "ASCEND",
    images: [
      {
        url: "/og-image.png", // We should ideally create this image later
        width: 1200,
        height: 630,
        alt: "ASCEND AI Career Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCEND — AI Career Intelligence Platform",
    description:
      "AI-powered skill mapping and career acceleration. Stop guessing, start ascending.",
    images: ["/og-image.png"],
    creator: "@heyarjun",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Load fonts via CSS instead of next/font/google (Turbopack compatibility) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased font-sans bg-background text-foreground transition-colors duration-300"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
