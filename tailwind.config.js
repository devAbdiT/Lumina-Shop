/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        midnight: {
          950: "#030712", // Deepest Night - almost black (highest contrast)
          900: "#0A1928", // Original Midnight - main background (your original)
          800: "#132435", // Elevated Surface - cards, panels
          700: "#1C2F42", // Higher Surface - modals, dropdowns
          600: "#253A4F", // Header/Nav - stands out but still dark
        },
        ice: {
          100: "#F0F7FF", // Brightest Ice - for primary text / headings
          200: "#E0ECF9", // Ice Blue - for secondary text
          300: "#C2D6E8", // Soft Ice - for tertiary text
          400: "#A3BBD4", // Muted Ice - for placeholder text / disabled
          500: "#7F9BB8", // Gray Ice - for borders / lines
        },
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          500: "#14b8a6",
          600: "#0d9488",
          900: "#134e4a",
        },
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
