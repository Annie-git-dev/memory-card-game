export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transform: ['group-hover'],
      keyframes: {
        highlight: {
          '0%': { backgroundColor: '#38bdf8', transform: 'scale(1)' },
          '50%': { backgroundColor: '#0ea5e9', transform: 'scale(1.1)' },
          '100%': { backgroundColor: '#38bdf8', transform: 'scale(1)' },
        },
      },
      animation: {
        highlight: 'highlight 0.6s ease-in-out',
      },
    },
  },
  plugins: [],
};