/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bubble': "url('/img/bubbles.jpg')",
        'lighthouse': "url('/img/lighthouse.jpg')",
        'stone': "url('/img/stones.jpg')",
      }
    },
  },
  plugins: [],
}