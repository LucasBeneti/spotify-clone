module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/recommended-type-checked",
    // "plugin:react/recommended",
    // "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "src/index.css",
    "**/*.md",
    "**/*.config.js",
  ],
  parser: "@typescript-eslint/parser",
  // parserOptions: {
  //   ecmaVersion: "latest",
  //   sourceType: "module",
  //   project: ["./tsconfig.json", "./tsconfig.node.json"],
  //   tsconfigRootDir: __dirname,
  // },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/rules-of-hooks": "off",
    "no-case-declarations": "off",
  },
};
