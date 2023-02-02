module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    '@vue/eslint-config-prettier',
    "@vue/typescript/recommended",    
    'plugin:prettier/recommended',
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",    
  },
};
