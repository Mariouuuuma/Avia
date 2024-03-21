/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      lineHeight: {
        'normal': 'normal', // Correspond à la ligne normale
      },
      fontSize: {
        'xs': '0.75rem', // Correspond à la taille de police 12px
      },
    },
  },
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

