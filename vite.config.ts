import { defineConfig } from "vite";
import tailwindLitPlugin from "tailwind-lit-rollup-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindLitPlugin()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
