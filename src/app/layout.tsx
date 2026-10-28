import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSE312 Software Architecture: Comprehensive Study Portal & Deployment Guide",
  description:
    "Comprehensive academic reference, interactive metric calculators, and GitHub Pages deployment manual with Claude website editorial design.",
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
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2246%22 fill=%22%23D97757%22/><text y=%22.7em%22 x=%2250%22 font-size=%2255%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22serif%22 font-weight=%22bold%22>✳</text></svg>"
        />
        {/* KaTeX Math Stylesheet */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          crossOrigin="anonymous"
        />
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
      <body className="h-full bg-claude-bg dark:bg-claude-darkBg text-claude-text dark:text-claude-darkText antialiased font-sans selection:bg-claude-clay/20 selection:text-claude-clayDeep dark:selection:bg-claude-clay/40 transition-colors">
        {children}
      </body>
    </html>
  );
}
