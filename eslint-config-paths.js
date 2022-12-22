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

const composeAtSignPath = (type, folder) => `@/${type}/${folder}`;
const composeDollarSignPath = (folder) => `$${folder}`;

const composeFeatureAtSignPath = (folder) =>
	composeAtSignPath("features", folder);
const composePackageAtSignPath = (folder) =>
	composeAtSignPath("packages", folder);
const composeLibAtSignPath = (folder) => composeAtSignPath("lib", folder);

const composeDeepPathGlob = (path) => `${path}/**`;

const composeInvalidFeatureImportPattern = (folder) =>
	composeDeepPathGlob(composeFeatureAtSignPath(folder));

const universalPatternRestrictions = [
	...featureFolders.map((folder) => ({
		group: [composeInvalidFeatureImportPattern(folder)],
		message: `Use "@/features/${folder}" instead`,
	})),
	...packageFolders.map((folder) => ({
		group: [
			composePackageAtSignPath(folder),
			composeDeepPathGlob(composePackageAtSignPath(folder)),
			composeDeepPathGlob(composeDollarSignPath(folder)),
		],
		message: `Use the shorthand "$${folder}" instead`,
	})),
	...libs.map((folder) => ({
		group: [
			composeLibAtSignPath(folder),
			composeDeepPathGlob(composeLibAtSignPath(folder)),
			composeDeepPathGlob(composeDollarSignPath(folder)),
		],
		message: `Use the shorthand "$${folder}" instead`,
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
							(pattern) =>
								!pattern.group.includes(
									composeInvalidFeatureImportPattern(folder)
								)
						),
					},
				],
			},
		})),
		...packageFolders.map((folder) => ({
			files: [`src/packages/${folder}/**/*.{ts,tsx}`],
			rules: {
				"no-restricted-imports": [
					"error",
					{
						paths: ["@/packages/", "$"].map((prefix) => ({
							name: `${prefix}${folder}`,
							message:
								"A package cannot import from its own index file. Write out the full file path instead.",
						})),
						patterns: universalPatternRestrictions.filter(
							(pattern) =>
								!pattern.group.includes(composePackageAtSignPath(folder))
						),
					},
				],
			},
		})),
		...libs.map((folder) => ({
			files: [`src/lib/${folder}/**/*.{ts,tsx}`],
			rules: {
				"no-restricted-imports": [
					"error",
					{
						paths: ["@/lib/", "$"].map((prefix) => ({
							name: `${prefix}${folder}`,
							message:
								"A lib cannot import from its own index file. Write out the full file path instead.",
						})),
						patterns: universalPatternRestrictions.filter(
							(pattern) =>
								!pattern.group.includes(composePackageAtSignPath(folder))
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
