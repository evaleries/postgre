const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: 'Poppins, sans-serif',
      sans2: '"Nunito Sans", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    scale: {
      0: '0',
      25: '.25',
      50: '.5',
      75: '.75',
      80: '.8',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
      200: '2',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const utilities = {
        '.bg-hero': {
          'background-image': 'url(/assets/bg-hero.webp)',
          'background-size': 'cover',
          'background-position': '25% 100%',
        },
        '.bg-footer': {
          background:
            'linear-gradient(280.05deg, #0A4FA4 0%, #939CE8 127.73%);',
        },
      };

      addUtilities(utilities);
    }),
  ],
};
