import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand:  '#2E7D32',
        accent: '#F57C00',
      },
      borderRadius: {
        card: '16px',
        btn:  '10px',
      },
    },
  },
  plugins: [],
};

export default config;
