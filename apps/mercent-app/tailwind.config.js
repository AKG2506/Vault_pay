import path from 'path';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    path.join(__dirname, "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}")
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
