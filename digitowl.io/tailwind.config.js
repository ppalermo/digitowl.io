/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./themes/digitowl/layouts/**/*.html",
    "./content/**/*.md",
    "./content/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#0a66c2',
          dark: '#004182',
          light: '#378fe9',
        },
        secondary: {
          DEFAULT: '#001e3c',
          light: '#0a2540',
        },
        accent: {
          DEFAULT: '#00d4aa',
          dark: '#00a884',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
