import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // Fuerza 2 espacios para la indentación general (incluyendo TS y TSX)
      'indent': ['error', 2, { SwitchCase: 1 }],

      // Forzar 2 espacios en la indentación (incluyendo JSX)
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      
      // Si usas JSX, esto asegura que las etiquetas también usen 2 espacios
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
    },
  },
])
