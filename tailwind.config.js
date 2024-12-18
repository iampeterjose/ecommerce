/** @type {import('tailwindcss').Config} */
module.exports = {
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
        customBlue: "#180161",
        customBlue2: "#112D4E",
        softgreen: "#00ADB5",
        softgreenl: "#a8d5ba",
        customDark: "#222831",
        customDark2: "#393E46",
        lightBg: "#F5F5F7",
        lightBg2: "#F4F6FF",
        lightpink: "#E7CCCC",
        avocado: "#A5B68D",
        lightavocado: "#C1CFA1",
        customOrange: "#F3C623",
        customOrange2: "#EB8317",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Example for slower spin
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      scrollBehavior: {
        smooth: 'smooth',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
