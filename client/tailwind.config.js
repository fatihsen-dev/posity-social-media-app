/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            sans: ["Inter var", ...defaultTheme.fontFamily.sans],
         },
      },
      container: {
         center: true,
      },
      colors: {
         lightV1: "#ffffff",
         lightV2: "#F7F7F7",
         lightV3: "#F2F2F2",
         lightV4: "#E6E6E6",
         grayV1: "#555555",
         grayV2: "#A6A6A6",
         mainDarkV1: "#171717",
         mainDarkV2: "#262626",
         navyBlue: "#264653",
      },
   },
   plugins: [],
};
