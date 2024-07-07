import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "clr-grey-900": "hsla(var(--grey-900))",
        "clr-grey-500": "hsla(var(--grey-500))",
        "clr-green-600": "hsla(var(--green-600))",
        "clr-green-200": "hsla(var(--green-200))",
        "clr-red": "hsla(var(--red))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)" },
          "80%": { transform: "translateY(20%)" },
          "90%": { transform: "translateY(15%)" },
          "95%": { transform: "translateY(5%)" },
          "100%": { transform: "translateY(0)" },
        },
        fadein: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.3" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-down": "slide-down 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        fadein: "fadein 550ms ease-in ",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
