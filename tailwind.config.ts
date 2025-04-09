import type { Config } from "tailwindcss";

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        spaceMono: ['Space Mono', 'monospace'],
        bebasNeue: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: []
} satisfies Config;