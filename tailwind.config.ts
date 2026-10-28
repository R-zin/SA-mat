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
        nordic: {
          spruce: "#0F2624",
          spruceDark: "#081716",
          polar: "#1A2E35",
          pine: "#2D6A4F",
          pineLight: "#40916C",
          pineBg: "rgba(45, 106, 79, 0.08)",
          frost: "#F3FAFF",
          mist: "#EBF4F6",
          linen: "#F7F5EE",
          slate: "#607B88",
          amber: "#E07A5F",
          amberLight: "#FF6B4A",
          hairline: "#D8E2DC",
          hairlineDark: "#22353E",
          darkBg: "#0B1317",
          darkSurface: "#121E24",
          darkSurfaceElevated: "#182830",
        },
      },
      fontFamily: {
        serif: ["Newsreader", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
