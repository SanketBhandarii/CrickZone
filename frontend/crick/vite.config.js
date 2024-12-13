import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/backend-api':{
        target:'https://crickzone-eq2pf0a2.b4a.run',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/backend-api/, ''),
      }
    }
  }
})
