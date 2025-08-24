import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    // Add TypeScript support
    tsconfigPaths: true,
    // Enable explicit type checking
    typeCheck: true
  })],
  // Add resolve configuration for better module resolution
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.css'],
  },
  // Add CSS configuration
  css: {
    modules: {
      localsConvention: 'camelCase',
    }
  },
  // Add build configuration
  build: {
    // Ensure proper module resolution
    modulePreload: {
      polyfill: true
    },
    // Set target for better compatibility
    target: 'esnext',
    // Enable CSS minification
    cssMinify: true,
    // Enable JS minification
    minify: 'esbuild'
  }
})
