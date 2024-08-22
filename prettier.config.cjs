/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 100,
  bracketSpacing: true,
}
