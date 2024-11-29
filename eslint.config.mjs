import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["./src/**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      curly: ["error", "all"],
      "no-empty-function": "warn",
      "no-else-return": "warn",
      "spaced-comment": ["error", "always"]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
