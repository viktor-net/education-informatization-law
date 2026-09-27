import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// The whole article — markup, styles and the three webfonts — has to survive as a
// single self-contained index.html that opens from the file system with no
// network access at all. viteSingleFile inlines every emitted asset as a data
// URI, so there is nothing left to fetch at runtime.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    reportCompressedSize: false,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
})
