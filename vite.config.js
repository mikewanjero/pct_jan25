import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "bootstrap" as *;`,
      },
    },
  },
  plugins: [react()],
  resolve: {
    "@styles": path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "src/styles"
    ),
  },
});
