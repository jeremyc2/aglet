import { defineConfig } from "vite";
import tailwindLitPlugin from "tailwind-lit-rollup-plugin";

const includeLit = true;

const config: any = {
  plugins: [tailwindLitPlugin()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
    },
  },
};

if (!includeLit) {
  config.build.rollupOptions = {
    external: /^lit/,
  };
}

// https://vitejs.dev/config/
export default defineConfig(config);
