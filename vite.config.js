import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import alias from "@rollup/plugin-alias";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [alias(), vue()],
  resolve: {
    extensions: [".js", ".json", ".vue", ".mjs", ".wasm"],
    alias: {
      "/@": path.resolve(__dirname, "./src"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./"
})
