import { defineConfig } from "vite";

export default defineConfig({
  build: {
    ssr: "./src/main.js",
    outDir: "./dist",
    minify: "esbuild",
  },
});
