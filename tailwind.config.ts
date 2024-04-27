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
      colors: {
        "grey-gourmet": "#E9E9E9",
        "purple-gourmet": "#811FFF",
        "yellow-gourmet": "#FFDB1F",
        "red-gourmet": "#DF2B2B",
        "input-color": "#F3F3F3",
        "dark-gourmet": "#5B5B5B",
      }
    },
  },
  plugins: [],
};
export default config;
