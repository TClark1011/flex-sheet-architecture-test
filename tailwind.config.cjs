/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin");

const defaultDaisyUiLightTheme = require("daisyui/src/colors/themes")["[data-theme=light]"];
const defaultDaisyUiDarkTheme = require("daisyui/src/colors/themes")["[data-theme=dark]"];

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
          hstack: (value) => ({
            display: 'flex',
            gap: value
          }),
          vstack: (value) => ({
            display: 'flex',
            flexDirection: 'column',
            gap: value,
          }),
          container: (value) => ({
            width: '100%',
            maxWidth: value
          })
        },
        { values: theme('spacing') }
      )
    })
  ],
  daisyui: {themes: [
    {
      light: {
        ...defaultDaisyUiLightTheme,
        neutral: defaultDaisyUiLightTheme["base-200"],
        "neutral-focus":  defaultDaisyUiLightTheme["base-300"],
        "neutral-content": defaultDaisyUiLightTheme["base-content"]
      },
      dark: defaultDaisyUiDarkTheme,
    },
  ],}
};
