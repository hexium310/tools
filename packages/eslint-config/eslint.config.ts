import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";
import { importX } from "eslint-plugin-import-x";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import { configs as tseslintConfigs } from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL("../../.gitignore", import.meta.url));

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    extends: [
      js.configs.recommended,
      // @ts-expect-error https://github.com/un-ts/eslint-plugin-import-x/issues/421 https://github.com/typescript-eslint/typescript-eslint/issues/11543
      importX.flatConfigs.recommended,
      // @ts-expect-error https://github.com/un-ts/eslint-plugin-import-x/issues/421 https://github.com/typescript-eslint/typescript-eslint/issues/11543
      importX.flatConfigs.react,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      stylistic.configs.customize({
        braceStyle: "1tbs",
        quoteProps: "as-needed",
        quotes: "double",
        semi: true,
      }),
    ],
    rules: {
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          enums: "always-multiline",
          exports: "always-multiline",
          imports: "always-multiline",
          objects: "always-multiline",
          tuples: "always-multiline",
        },
      ],
      "import-x/first": ["error"],
      "import-x/newline-after-import": ["error"],
      "import-x/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
          },
          distinctGroup: true,
          groups: ["builtin", "external", "parent", "sibling", "index", "type"],
          "newlines-between": "always",
          sortTypesGroup: true,
        },
      ],
      "no-empty": [
        "error",
        {
          allowEmptyCatch: true,
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      tseslintConfigs.recommendedTypeChecked,
      tseslintConfigs.strictTypeChecked,
      tseslintConfigs.stylisticTypeChecked,
      importX.flatConfigs.typescript,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),

      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  }
);
