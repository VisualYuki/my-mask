import { defineConfig } from "vite";
import { resolve } from "path";
import pkg from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MyMask",
      fileName: pkg.name,
      formats: ["es", "cjs", "iife", "umd"],
    },
  },
});
