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

const featureFolders = fs.readdirSync("src/features")
const packageFolders = fs.readdirSync("src/packages")
const libFiles = fs.readdirSync("src/lib");

const libs = libFiles.map(file => file.replace(".ts", ""))

const universalPathRestrictions = [...packageFolders.map(folder => ({
  name: `@/packages/${folder}`,
  message: `Use the shorthand "$${folder}" instead`
})), ...libs.map(lib => ({
  name: `@/lib/${lib}`,
  message: `Use the shorthand "$${lib}" instead`
}))]

/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  plugins: ["import"],
  overrides: [
    ...featureFolders.map((folder) => ({
      files: [`src/features/${folder}/**/*.{ts,tsx}`],
      rules: {
        'no-restricted-imports': ['error', { paths: [...universalPathRestrictions,{
          name: `@/features/${folder}`,
          message: 'A feature cannot import from its own index file. Write out the full file path instead.'
        }], }],
      }
    })),
    ...packageFolders.map((folder) => ({
      files: [`src/packages/${folder}/**/*.{ts,tsx}`],
      rules: {
        'no-restricted-imports': ['error', { paths: [...universalPathRestrictions,{
          name: `$${folder}`,
          message: 'A feature cannot import from its own index file. Write out the full file path instead.'
        }],  }],
      }
    }))
  ],
  // rules: {
  //   "no-restricted-imports": ['error', {
  //     paths: [...packageFolders.map(folder => ({
  //       name: `@/packages/${folder}`,
  //       message: `Use the shorthand "$${folder}" instead`
  //     })), ...libs.map(lib => ({
  //       name: `@/lib/${lib}`,
  //       message: `Use the shorthand "$${lib}" instead`
  //     }))]
  //   }]
  // }
}
