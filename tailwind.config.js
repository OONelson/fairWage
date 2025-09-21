/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand colors
        "fw-primary": {
          600: "#c026d3",
          700: "#a21caf",
        },
        "fw-secondary": {
          600: "#7c3aed",
        },
        "fw-accent": {
          500: "#f97316",
        },

        // Gray scale
        "fw-gray": {
          200: "#e5e7eb",
          300: "#d1d5db",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },

        // Slate scale
        "fw-slate": {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
        },

        // Additional colors
        "fw-red": {
          600: "#dc2626",
        },

        // White with opacity variants
        "fw-white": {
          DEFAULT: "#ffffff",
          90: "rgba(255, 255, 255, 0.9)",
          95: "rgba(255, 255, 255, 0.95)",
        },

        // Black
        "fw-black": "#000000",
      },

      // Gradient color stops
      gradientColorStops: {
        "fw-from": "#c026d3",
        "fw-via": "#7c3aed",
        "fw-to": "#f97316",
      },

      // Border colors
      borderColor: {
        "fw-gray": {
          200: "#e5e7eb",
          300: "#d1d5db",
          800: "#1f2937",
        },
        "fw-slate": {
          200: "#e2e8f0",
          300: "#cbd5e1",
        },
      },

      // Placeholder colors
      placeholderColor: {
        "fw-slate": {
          400: "#94a3b8",
        },
      },

      // Ring colors (focus rings)
      ringColor: {
        "fw-black": "rgba(0, 0, 0, 0.05)",
        "fw-white": "rgba(255, 255, 255, 0.4)",
      },
    },
  },
};
