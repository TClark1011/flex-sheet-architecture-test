/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Here we define the special rules for importing from package, lib
 * and feature folders.
 *
 * All imports of content from a lib or a package folder should be
 * done from `$folder-name`. Imports of content within a feature
 * folder should be done with `@/features/feature-name`.
 *
 * The exception to these rules are when a file in a package,lib,
 * or feature folder imports from another file in the same folder.
 * In that case, they must use the full path.
 */

const fs = require("fs");

const featureFolders = fs.readdirSync("src/features");
const packageFolders = fs.readdirSync("src/packages");
const libFiles = fs.readdirSync("src/lib");

const libs = libFiles.map((file) => file.replace(".ts", ""));

const universalPatternRestrictions = [
	...featureFolders.map((folder) => ({
		group: [`@/features/${folder}/*`],
		message: `Use "@/features/${folder}" instead`,
	})),
	...packageFolders.map((folder) => ({
		group: [`@/packages/${folder}/**`, `$${folder}/**`],
		message: `Use the shorthand "$${folder}" instead`,
	})),
	...libs.map((lib) => ({
		group: [`@/lib/${lib}/**`, `$${lib}/**`],
		message: `Use the shorthand "$${lib}" instead`,
	})),
];

/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
	overrides: [
		...featureFolders.map((folder) => ({
			files: [`src/features/${folder}/**/*.{ts,tsx}`],
			rules: {
				"no-restricted-imports": [
					"error",
					{
						paths: [
							{
								name: `@/features/${folder}`,
								message:
									"A feature cannot import from its own index file. Write out the full file path instead.",
							},
						],
						patterns: universalPatternRestrictions.filter(
							(pattern) => !pattern.group.includes(`@/features/${folder}/*`)
						),
					},
				],
			},
		})),
		...packageFolders.map((packageFolder) => ({
			files: [`src/packages/${packageFolder}/**/*.{ts,tsx}`],
			rules: {
				"no-restricted-imports": [
					"error",
					{
						paths: ["@/packages/", "$"].map((prefix) => ({
							name: `${prefix}${packageFolder}`,
							message:
								"A package cannot import from its own index file. Write out the full file path instead.",
						})),
						patterns: universalPatternRestrictions.filter(
							(pattern) =>
								!pattern.group.includes(`@/packages/${packageFolder}/**`)
						),
					},
				],
			},
		})),
		...libs.map((lib) => ({
			files: [`src/lib/${lib}/**/*.{ts,tsx}`],
			rules: {
				"no-restricted-imports": [
					"error",
					{
						paths: ["@/lib/", "$"].map((prefix) => ({
							name: `${prefix}${lib}`,
							message:
								"A lib cannot import from its own index file. Write out the full file path instead.",
						})),
						patterns: universalPatternRestrictions.filter(
							(pattern) => !pattern.group.includes(`@/lib/${lib}/**`)
						),
					},
				],
			},
		})),
	],
	rules: {
		"no-restricted-imports": [
			"error",
			{
				patterns: universalPatternRestrictions,
			},
		],
	},
};
