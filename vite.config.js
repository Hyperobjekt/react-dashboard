const path = require("path");

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "HypReactDashboard",
      fileName: (format) => `HypReactDashboard.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-query",
        "mapbox-gl",
        "@hyperobjekt/mapgl",
        "@hyperobjekt/scales",
        "zustand",
      ],
      output: {
        globals: {
          react: "react",
          "react-dom": "ReactDOM",
          "mapbox-gl": "mapboxgl",
        },
      },
    },
  },
  plugins: [react()],
});
