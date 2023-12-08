/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/static/images/homepageImage_en_US.jpg')",
      },
      opacity: {
        '54': '0.8',
      },
      colors: {
        'font-color-primary': '#6f2f83',
        'font-color-seconary': '#000000',
        'font-color-third': '#898989',
        'bg-bg-primary': '#6f2f83',
      },
    },
  },
  plugins: [],
};
