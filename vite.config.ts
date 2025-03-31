import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import WebSpatial from "@webspatial/vite-plugin";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
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
    define: {
      "process.env.XR_ENV": JSON.stringify(env.XR_ENV),
      __XR_ENV_BASE__: process.env.XR_ENV
        ? JSON.stringify(`/webspatial/${process.env.XR_ENV}`)
        : undefined,
    },
  };
});
