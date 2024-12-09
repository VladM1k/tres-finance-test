/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,html,css}'],
  theme: {
    extend: {
      colors: {
        primary: '#1F1F1F',
        secondary: '#8E8F98',
        grey: '#5A5A5E',
        light: {
          grey: {
            100: '#F0F1F5',
            200: '#D2D3D7',
          },
          blue: {
            100: '#CDDEFF',
            200: '#DEEAFF',
          },
        },
        dark: {
          blue: '#0E0E52',
        },
        row: '#EFF4FF',
      },
    },
  },
  plugins: [],
}
