const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
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
};
