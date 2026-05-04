import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Для GitHub Pages CI передаёт VITE_BASE=/имя-репозитория/ — локально не задаём.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
