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

        CEA4D21: '#EA4D21',
        C2a9d8f: '#2a9d8f',
        C264653: '#264653',
        Ce9c46a: '#e9c46a',
        Cf4a261: '#f4a261',
        Ce76f51: '#e76f51',
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        serif: ['Newsreader', ...defaultTheme.fontFamily.serif],
        heading: ['Newsreader', ...defaultTheme.fontFamily.serif],
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '1.0625rem',
            lineHeight: '1.65',
            maxWidth: '65ch',
            color: 'var(--aw-color-text-default)',
            p: {
              marginTop: '1em',
              marginBottom: '1em',
            },
            h2: {
              marginTop: '2em',
              marginBottom: '0.75em',
              fontWeight: '600',
            },
            h3: {
              marginTop: '1.5em',
              marginBottom: '0.5em',
              fontWeight: '600',
            },
            a: {
              color: 'var(--aw-color-primary)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            code: {
              fontSize: '0.875em',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      textColor: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
