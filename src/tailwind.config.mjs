/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FBBF24',
        'primary-foreground': '#000000',
        secondary: '#00D0FF',
        'secondary-foreground': '#000000',
        background: '#00172E',
        foreground: '#FFFFFF',
        destructive: '#FF4136',
        'destructive-foreground': '#FFFFFF',
        'dark-amber-shadow': '#4A340E',
        obsidian: '#00172E',
        ivory: '#FFFFFF',
        gold: '#FBBF24',
        muted: '#999999',
        border: '#333333',
      },
      fontFamily: {
        heading: ['cinzel', 'serif'],
        paragraph: ['montserrat', 'sans-serif'],
        body: ['montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
