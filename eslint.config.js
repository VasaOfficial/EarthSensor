import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['**/.*', 'dist/*', '**/node_modules/', 'app/env.mjs', 'prettier.config.cjs', 'postcss.config.cjs'],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": 'off'
    },
  },
  eslintConfigPrettier,
]
