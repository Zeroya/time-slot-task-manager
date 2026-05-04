import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
// Для GitHub Pages CI передаёт VITE_BASE=/имя-репозитория/ — локально не задаём.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
})
