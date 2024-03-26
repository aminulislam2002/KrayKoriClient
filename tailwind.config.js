/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#6B7280",
        price: "#22C55E",
      },
      backgroundColor: {
        primary: "#FFFFFF",
        secondary: "#F6F7F8",
      },
      fontFamily: {
        primary: "Poppins",
        secondary: "Public Sans",
      },
    },
  },
  plugins: [require("daisyui")],
  darkMode: "class",
};
