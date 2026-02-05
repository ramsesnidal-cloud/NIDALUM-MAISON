/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C6A35B',
        'primary-foreground': '#F3EFE6',
        secondary: '#3B0F16',
        'secondary-foreground': '#F3EFE6',
        background: '#050505',
        foreground: '#F3EFE6',
        destructive: '#3B0F16',
        'destructive-foreground': '#F3EFE6',
        'dark-amber-shadow': '#3B0F16',
        obsidian: '#050505',
        'night-surface': '#0B0B0B',
        'hairline-border': '#1A1A1A',
        ivory: '#F3EFE6',
        gold: '#C6A35B',
        'muted-text': '#B8B2A6',
        muted: '#B8B2A6',
        border: '#1A1A1A',
        oxblood: '#3B0F16',
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
