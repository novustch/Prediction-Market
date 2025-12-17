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
        primary: "#07B3FF",
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
