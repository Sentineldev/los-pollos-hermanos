/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        
        mytheme: {

          "primary": "#F20519",

          "secondary": "#D926AA",

          "accent": "#1FB2A5",

          "neutral": "#191D24",

          "base-100": "#2A303C",

          "info": "#3ABFF8",

          "success": "#05C7F2",

          "warning": "#FBBD23",

          "error": "#F87272",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
}

