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

          "primary": "#021F59", /*Azul Oscuro*/

          "secondary": "#F20D0F", /*Rojo Oscuro*/

          "accent": "#00B0EB", /*Azul cielo*/

          "neutral": "#191D24",/*Negro*/

          "base-100": "#271e1e",/*gris*/

          "info": "#d9e4ee", /*Blanco gris */

          "success": "#05C7F2",

          "warning": "#FFBC0D", /*Amarillo Mostaza*/

          "error": "#191D24", /*Rojo Opaco */
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
