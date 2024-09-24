import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'xs': {'max': '450px'}, 
        'notxs': '450.1px',
        'short': { 'raw': '(max-height: 430px)' },
      },
      colors: {
        'sliderColor-0': '#D3D3D3', 
        'sliderColor-1': 'rgb(141, 238, 176)', 
        'sliderColor-2': 'rgb(101, 229, 148)', 
        'sliderColor-3': 'rgb(74, 222, 128)', 
        'sliderColor-4': 'rgb(250, 227, 137)', 
        'sliderColor-5': 'rgb(251, 217, 81)',  
        'sliderColor-6': 'rgb(250, 204, 21)',  
        'sliderColor-7': 'rgb(255, 170, 100)', 
        'sliderColor-8': 'rgb(251, 146, 60)',  
        'sliderColor-9': 'rgb(255, 116, 116)', 
        'sliderColor-10': 'rgb(253, 83, 83)',  
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [],
};
export default config;
