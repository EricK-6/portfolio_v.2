/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // the whole palette: warm paper + near-black ink, inverted for dark.
        // everything else is Tailwind's neutral scale.
        paper: { DEFAULT: '#f7f6f3', dark: '#0b0b0c' },
        ink: { DEFAULT: '#1c1917', dark: '#e7e5e4' },
      },
    },
  },
  plugins: [],
}
