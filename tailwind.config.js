/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS, JSX, TS, and TSX files in the src directory
    './pages/**/*.{js,jsx,ts,tsx}', // Include all JS, JSX, TS, and TSX files in the pages directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

