import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/backend": {
        target: "http://localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ""),
      },
      "/auth/github/callback": {
        target: "http://localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path,
      }
    }
  },
  plugins: [react()],
})
