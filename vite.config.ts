import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     cache: false,
  //     maxParallelFileOps: 2,
  //     output: {
  //       sourcemap: true,
  //       manualChunks: (id) => {
  //         if (id.includes("node_modules")) {
  //           return "vendor";
  //         }
  //       }
  //     }
  //   }
  // }
})
