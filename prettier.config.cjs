/** @type {import("prettier").Config} */
module.exports = {
	singleQuote: false,
	useTabs: true,
	plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
