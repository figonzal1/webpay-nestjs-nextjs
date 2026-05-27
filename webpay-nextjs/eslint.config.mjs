import nextConfig from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import oxlint from "eslint-plugin-oxlint";
import prettierConfig from "eslint-config-prettier";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...nextConfig,
  ...nextTypescript,
  // Override react version to avoid eslint-plugin-react auto-detection
  // (context.getFilename() was removed in ESLint 10, breaking version: 'detect')
  {
    settings: {
      react: { version: "19" },
    },
  },
  // Disable ESLint rules already covered by oxlint (prevents double-reporting)
  ...oxlint.configs["flat/recommended"],
  // Disable ESLint formatting rules that conflict with Prettier
  prettierConfig,
];

export default config;
