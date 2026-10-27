import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // <--- 1. Importa path

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: { // <--- 2. Agrega la sección resolve con el alias
    alias: {
      '@': path.resolve(__dirname, './src'),     // <--- Añade esto para el "@"
      '@src': path.resolve(__dirname, './src'), // <--- Y mantén este por si lo usas en otro lado
    },
  },
})