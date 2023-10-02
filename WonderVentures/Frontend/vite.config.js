import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Add this line
    include: "**/*.jsx",
  })],
  define: { 
    global: "globalThis"
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  server:
  {
    watch: {
      usePolling: true
    },
    hmr: true
  },
  build: {
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    },
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
      strictRequires: true,
      transformMixedEsModules: true,
    },
    chunkSizeWarningLimit: 100000000,
    sourcemap: true,
}
});
