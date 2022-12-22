const plugin = require("tailwindcss/plugin");
const { fontFamily } = require("tailwindcss/defaultTheme");

const sansFontStack = ["Inter", ...fontFamily.sans];

const defaultDaisyUiLightTheme = require("daisyui/src/colors/themes")[
	"[data-theme=light]"
];
const defaultDaisyUiDarkTheme = require("daisyui/src/colors/themes")[
	"[data-theme=dark]"
];

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: sansFontStack,
				title: ["Comfortaa", ...sansFontStack],
			},
		},
	},
	plugins: [
		require("daisyui"),
		require("@tailwindcss/line-clamp"),
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					size: (value) => ({
						// custom `size` utility
						height: value,
						width: value,
					}),
					hstack: (value) => ({
						// horizontal stack
						display: "flex",
						gap: value,
					}),
					vstack: (value) => ({
						// vertical stack
						display: "flex",
						flexDirection: "column",
						gap: value,
					}),
					container: (value) => ({
						// Usually used to contain the main content of a page
						// Will usually use the width provided, but will shrink
						// to fit narrow screens
						width: "100%",
						maxWidth: value,
					}),
				},
				{ values: theme("spacing") }
			);
		}),
	],
	daisyui: {
		themes: [
			{
				light: {
					...defaultDaisyUiLightTheme,
					neutral: defaultDaisyUiLightTheme["base-200"],
					"neutral-focus": defaultDaisyUiLightTheme["base-300"],
					"neutral-content": defaultDaisyUiLightTheme["base-content"],
				},
				dark: defaultDaisyUiDarkTheme,
			},
		],
	},
};
