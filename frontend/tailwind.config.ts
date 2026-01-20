import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/landing/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "2000px",
        "4xl": "2560px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // CheckBrice colors (from zillaz.net)
        primary: "#D94F30",      // Red-orange primary
        secondary: "#FF6B35",    // Orange accent
        navy: "#2C3E50",         // Dark blue background
        cream: "#F5EFE0",        // Beige/cream background
        yes: "#10B981",          // Green for YES
        no: "#EF4444",           // Red for NO
      },
      fontFamily: {
        anton: ["anton"],
        satoshi: ["satoshi"],
        rubik:["rubik"],
        interSemi:["interSemi"],
      },
    },
  },
  plugins: [],
} satisfies Config;
