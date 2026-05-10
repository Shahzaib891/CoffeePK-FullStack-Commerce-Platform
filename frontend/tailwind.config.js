/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        history: "url('/public/assets/images/cold-brew.webp')",
        main: "url('/public/assets/images/bg-main-coffee.webp')",
        profile: "url('/public/assets/images/bg-profile.webp')",
        cart: "url('/public/assets/images/bg-cart.webp')",
      },
      boxShadow: {
        primary: "0px 6px 20px 0px #00000020;",
      },
      spacing: {
        22: "7rem",
      },
      colors: {
        primary: "#4F5665",
        "primary-context": "#7C828A",
        secondary: "#ffba33",
        "secondary-200": "#f4a200",
        tertiary: "#6A4029",
        quartenary: "#0b132a",
      },
      borderWidth: {
        1: "1px",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        jokopi: {
          primary: "#6A4029",
          secondary: "#ffba33",
          accent: "#0b132a",
          neutral: "#9f9f9f",
          "base-100": "#fff",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          "plain-white": "#FFF",
        },
      },
      {
        coffeepk: { // Dark theme for CoffeePK
          primary: "#D4A574", // Warm coffee brown
          secondary: "#FFD700", // Pakistan-inspired gold
          accent: "#1E40AF", // Deep blue for contrast
          neutral: "#374151",
          "neutral-content": "#D1D5DB",
          "base-100": "#1F2937", // Dark gray background
          "base-200": "#111827", // Darker gray for depth
          "base-300": "#0F172A", // Darkest gray
          "base-content": "#F9FAFB", // Light text on dark
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [require("daisyui")],
};