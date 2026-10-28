import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        claude: {
          // Warm Terracotta / Burnt Clay (Signature Claude Accent)
          clay: "#D97757",
          clayDark: "#CC6B49",
          clayDeep: "#B85837",
          claySubtle: "rgba(217, 119, 87, 0.08)",
          clayBorder: "rgba(217, 119, 87, 0.25)",

          // Muted Moss Green (Secondary Invariants / Verified Proofs)
          moss: "#5E6B58",
          mossSubtle: "rgba(94, 107, 88, 0.08)",
          mossBorder: "rgba(94, 107, 88, 0.25)",

          // Canvas & Surfaces (Warm Linen & Archival Parchment)
          bg: "#FAF7F2",              // Warm parchment main canvas
          bgSubtle: "#F4EFEA",        // Recessed well / sidebar tint
          card: "#FFFFFF",            // Crisp elevated paper card
          cardSubtle: "#FCFAF7",      // Subtle card
          border: "#E5DFD6",          // 1px warm stone hairline rule
          borderSubtle: "#EDE6DC",

          // Typography & Ink (Deep Espresso & Warm Charcoal)
          ink: "#1F1D1A",             // Deep warm espresso for titles
          text: "#2D2824",            // Primary reading text
          muted: "#736B63",           // Secondary metadata slate
          faint: "#A39B91",           // Disabled / subtle borders

          // Dark Mode (Warm Obsidian & Smokey Espresso)
          darkBg: "#181614",          // Deep warm obsidian
          darkSurface: "#211E1B",     // Elevated charcoal surface
          darkSurfaceElevated: "#2A2622", // Card elevation
          darkBorder: "#38332D",      // Warm dark hairline
          darkBorderSubtle: "#2C2823",
          darkText: "#EFECE6",        // Light warm ivory reading text
          darkMuted: "#A1998E",       // Muted dark metadata
        },
      },
      fontFamily: {
        serif: ["Newsreader", "Lora", "Georgia", "serif"],
        sans: ["Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        "claude-sm": "0 1px 3px 0 rgba(31, 29, 26, 0.04), 0 1px 2px -1px rgba(31, 29, 26, 0.02)",
        "claude-md": "0 4px 16px -2px rgba(31, 29, 26, 0.06), 0 2px 4px -2px rgba(31, 29, 26, 0.03)",
        "claude-lg": "0 12px 32px -4px rgba(31, 29, 26, 0.08), 0 4px 8px -2px rgba(31, 29, 26, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
