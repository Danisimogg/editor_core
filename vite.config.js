import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { replaceCodePlugin } from "vite-plugin-replace";
import babel from "@rollup/plugin-babel";
import path from "path";

export default defineConfig({
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: /__DEV__/g,
          to: "true",
        },
      ],
    }),
    babel({
      babelHelpers: "bundled",
      babelrc: false,
      configFile: false,
      exclude: "/**/node_modules/**",
      extensions: ["jsx", "js", "ts", "tsx", "mjs"],
      plugins: ["@babel/plugin-transform-flow-strip-types"],
      presets: ["@babel/preset-react"],
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib.ts"),
      fileName: "main",
      formats: ["es", "cjs"],
    },
    outDir: "build",
    rollupOptions: {
      input: {
        main: new URL("./index.html", import.meta.url).pathname,
      },
    },
  },
});
