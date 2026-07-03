import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101413",
        surface: "#181D1C",
        line: "#262C2B",
        primary: "#FFFFFF",
        secondary: "#9BA3A1",
        muted: "#7A827F",
        accent: "#FFDE38",
        navy: "#14305B",
        link: "#5599FA",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid display scale — clamp(min, fluid, max)
        "display-xl": ["clamp(2.75rem, 1.6rem + 5.2vw, 6rem)", { lineHeight: "0.96", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 1.4rem + 3.6vw, 4.25rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.22em" }],
      },
      maxWidth: {
        shell: "1200px",
        prose: "60ch",
      },
      spacing: {
        section: "clamp(5rem, 3rem + 8vw, 9rem)",
      },
      borderRadius: {
        xl2: "1.375rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 80px -24px rgba(255,222,56,0.18)",
        elevate: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 30px 60px -30px rgba(0,0,0,0.8)",
      },
      transitionTimingFunction: {
        signal: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-line": {
          "0%, 100%": { opacity: "0.35", transform: "scaleX(0.6)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "pulse-line": "pulse-line 3.2s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
