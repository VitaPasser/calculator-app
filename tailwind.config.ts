import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'outer-space': "#283637",
        'sirocco': "#6D807E",
        'corduroy': '#536162',
      },
      fontFamily: {
        jost: ['var(--font-jost)'],
      }
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
