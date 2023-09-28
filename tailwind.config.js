/** @type {import('tailwindcss').Config} */

const debugScreens = require('tailwindcss-debug-screens');

export default {
  content: ['./src/**/*.{html,js,svelte,ts,css}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat', 'Inclusive\\ Sans']
      },
      backdropBlur: {
        'half-sm': 'blur(2px)', // You can adjust the blur value as needed
      },
    },
  },
  plugins: [
    debugScreens
  ],
}

