import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import WebSpatial from "@webspatial/vite-plugin";
import { createHtmlPlugin } from "vite-plugin-html";

const basename =
  process.env.XR_ENV === "avp"
    ? `/webspatial/${process.env.XR_ENV}`
    : undefined;

console.log("basename: ", basename);

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
  // temporary
  // base: basename,
  define: {
    __XR_ENV_BASE__: basename ? JSON.stringify(basename) : undefined,
  },
});
