import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import WebSpatial from "@webspatial/react-plugin-vite";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    WebSpatial(),
    createHtmlPlugin({
      inject: {
        data: {
          XR_ENV: process.env.XR_ENV,
        },
      },
    }),
  ],
  server: {
    port: process.env.XR_ENV ? 5001 : undefined,
  },
});
