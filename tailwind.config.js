/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        accent: ['Tangerine'],
        display: ['Rye'],
        text: ['Cantarell'],
        sans: ['Roboto'],
      },
      colors: {
        form: '#30313d',
        primary: {
          500: 'hsl(137 58% 11%)',
          700: 'hsl(137, 58% 5%)',
        },
        backdrop: {
          500: 'hsl(36 62% 90%)',
          700: 'hsl(36 62% 94%)',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

module.exports = config;
