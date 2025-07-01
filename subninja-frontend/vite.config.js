import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/categorias' : 'http://localhost:3000',
      '/assinaturas' : 'http://localhost:3000',
      '/notificacoes' : 'http://localhost:3000',
      '/auth' : 'http://localhost:3000',
    },
  },
});
