import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import mkcert from 'vite-plugin-mkcert'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills(), mkcert()],
  base: ((process.env.GITHUB_REPOSITORY ?? "") + "/").match(/(\/.*)/)?.[1],
  server: {
    host: "127.0.0.1",
    https: true,
  }, // Not needed for Vite 5+

});