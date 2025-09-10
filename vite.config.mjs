import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: "docs",
  },
  resolve: {
    alias: {
      $assets: resolve("src/assets"),
    },
  },
});
