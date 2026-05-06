import type { Config } from "tailwindcss";

export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0f1a",
        mist: "#e8f4fc",
        frost: "rgba(255, 255, 255, 0.06)",
        accent: {
          DEFAULT: "#38bdf8",
          muted: "#0ea5e9",
          deep: "#0369a1",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "spin-slow": "spin-slow 28s linear infinite",
        shimmer: "shimmer 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        orbit: "orbit 14s linear infinite",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotateX(12deg) rotateY(-18deg) rotateZ(0deg)" },
          "100%": { transform: "rotateX(12deg) rotateY(-18deg) rotateZ(360deg)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.55", filter: "blur(0px)" },
          "50%": { opacity: "1", filter: "blur(1px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(48px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(48px) rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
