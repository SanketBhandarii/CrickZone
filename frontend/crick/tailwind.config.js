/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        scrn1: "847px",
        scrn2: "728px",
        scrn3: "398px", // Defines a custom screen size at a minimum width of 847px
      },
      backgroundColor: {
        "bg-clr1": "#0f2f56",
        "bg-clr2": "#1d2756",
      },
      colors: {
        "t-clr1": "#1d2756",
      },
      height: {
        "height-1": "440px",
      },
      width: {
        "width-1": "350px",
        "width-2" : "650px"
      },
      fontFamily: {
        font_1: ['"Radio Canada Big"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
