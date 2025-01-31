import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: [
        "0.875rem",
        {
          lineHeight: "1.3125rem",
          fontWeight: "500",
        },
      ],
      sm: [
        "0.937rem",
        {
          lineHeight: "1.25rem",
        },
      ],
      "sm-semibold": [
        "0.937rem",
        {
          lineHeight: "1.25rem",
          fontWeight: "600",
        },
      ],
      md: [
        "1rem",
        {
          lineHeight: "1.3125rem",
          fontWeight: "500",
        },
      ],
      body: [
        "1.125rem",
        {
          lineHeight: "1.4375rem",
        },
      ],
      lg: [
        "1.25rem",
        {
          lineHeight: "1.625rem",
          fontWeight: "600",
        },
      ],
      xl: [
        "1.5rem",
        {
          lineHeight: "1.625rem",
          fontWeight: "600",
        },
      ],
      h1: [
        "2.25rem",
        {
          lineHeight: "2.5rem",
          fontWeight: "600",
        },
      ],
      display: [
        "4rem",
        {
          lineHeight: "4.5rem",
          fontWeight: "600",
        },
      ],
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        marque: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marque: "marque var(--duration) linear infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      blur: {
        "4xl": "235px",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
