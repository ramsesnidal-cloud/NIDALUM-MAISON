/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FBBF24',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#00D0FF',
          foreground: '#000000',
        },
        background: '#00172E',
        foreground: '#FFFFFF',
        destructive: '#FF4136',
        'destructive-foreground': '#FFFFFF',
        'dark-amber-shadow': '#4A340E',
      },
      fontFamily: {
        heading: ['cinzel', 'serif'],
        paragraph: ['montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
