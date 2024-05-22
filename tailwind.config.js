/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#135D66',
        secondary: '#003C43',
        tertiary: '#277f8a',
      },
    },
  },
  plugins: [],
};
