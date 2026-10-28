import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSE312 Software Architecture: Comprehensive Study Portal & Deployment Guide",
  description:
    "Comprehensive academic reference, interactive metric calculators, and GitHub Pages deployment manual with Nordic minimalist architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌲</text></svg>" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="h-full bg-nordic-frost dark:bg-nordic-darkBg text-nordic-spruce dark:text-gray-100 antialiased font-sans selection:bg-nordic-pine/20 selection:text-nordic-pine dark:selection:bg-nordic-pine/40">
        {children}
      </body>
    </html>
  );
}
