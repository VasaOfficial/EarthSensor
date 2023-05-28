import { type Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      caretColor: {
        'black': '#000000', // Set the desired color value for the caret
      },
    },
  },
  plugins: [],
} satisfies Config;
