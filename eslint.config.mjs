import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Files and directories excluded from linting.
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "**/*.min.js",

      // Obsolete monolithic content script.
      "js/telegram-contentScript.js",
    ],
  },

  // Common rules for the extension and development files.
  {
    files: ["js/**/*.js", "tests/**/*.cjs", "eslint.config.mjs"],

    rules: {
      ...js.configs.recommended.rules,

      // Unused variables are worth reviewing, but should not
      // automatically make the lint operation fail.
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // Additional code-quality checks.
      "no-shadow": "warn",
      eqeqeq: ["warn", "always", { null: "ignore" }],

      // Prevent dynamic JavaScript evaluation.
      "no-eval": "error",
      "no-new-func": "error",

      // Console logging is useful for extension diagnostics.
      "no-console": "off",
    },
  },

  // Extension scripts execute in the browser as classic scripts.
  {
    files: ["js/**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",

      globals: {
        ...globals.browser,
      },
    },
  },

  // Chrome extension APIs are available in the isolated world.
  {
    files: ["js/content/**/*.js"],

    languageOptions: {
      globals: {
        chrome: "readonly",
      },
    },
  },

  // Node.js regression tests.
  {
    files: ["tests/**/*.cjs"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",

      globals: {
        ...globals.node,
      },
    },
  },

  // ESLint's configuration itself runs in Node.js.
  {
    files: ["eslint.config.mjs"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.node,
      },
    },
  },
]);
