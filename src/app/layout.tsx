import "./globals.css";

export const metadata = {
  title: "ASCEND — AI Career Intelligence Platform",
  description: "AI-powered skill analysis, gap visualization, and personalized learning paths. Transform into who you want to become.",
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
        className="antialiased font-sans bg-black text-white"
      >
        {children}
      </body>
    </html>
  );
}

