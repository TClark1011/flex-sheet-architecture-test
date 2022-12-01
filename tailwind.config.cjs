/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

    },
  },
  plugins: [
    require("daisyui"), 
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          size: (value) => ({
            // custom `size` utility
            height: value,
            width: value,
          }), 
        },
        { values: theme('spacing') }
      )
    })
  ]
};
