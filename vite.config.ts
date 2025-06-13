import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom'
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'tiptap': ['@tiptap/core', '@tiptap/react', '@tiptap/starter-kit'],
          'ui': ['@radix-ui/react-dropdown-menu', '@radix-ui/react-navigation-menu', '@radix-ui/react-popover', '@radix-ui/react-tooltip']
        }
      }
    }
  }
});
