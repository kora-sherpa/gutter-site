/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18191C",
        navy: "#1E2A38",
        orange: {
          DEFAULT: "#F26522",
          dark: "#D8551A",
        },
        cyan: "#0077C8",
        surface: "#F8FAFC",
        border: "#E2E8F0",
        muted: "#5B6472",
        "pale-sage": "#DCE5DC",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Manrope'", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
  plugins: [],
};
