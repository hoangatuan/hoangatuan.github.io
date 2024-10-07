const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',

        C2a9d8f: '#2a9d8f',
        C264653: '#264653',
        Ce9c46a: '#e9c46a',
        Cf4a261: '#f4a261',
        Ce76f51: '#e76f51',
      },
      fontFamily: {
        serif: ['Times New Roman', 'serif'],
        heading: ['var(--aw-font-heading)', ...defaultTheme.fontFamily.sans],
        'noto-serif': ['var(--noto-serif-font)', 'serif'],
        'open-sans': ['var(--open-sans-font)', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      textColor: ['group-hover'], // Make sure this is included to allow hover effects
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
