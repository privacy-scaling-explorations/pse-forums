import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "path"

const plugins = [tsconfigPaths(), TanStackRouterVite(), react()]

export default defineConfig(({ mode }) => {
  return {
    plugins,
    server: { open: mode === "development" },
    build: {
      outDir: "dist",
      rollupOptions: {
        // Force Rollup to not try to use native modules
        context: 'globalThis',
        external: [
          '@rollup/rollup-linux-x64-gnu',
          '@rollup/rollup-linux-x64-musl',
          '@rollup/rollup-darwin-x64',
          '@rollup/rollup-win32-x64-msvc'
        ]
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        // Create alias for problematic Rollup packages
        "@rollup/rollup-linux-x64-gnu": path.resolve(__dirname, "./src/utils/empty-module.js"),
        "@rollup/rollup-linux-x64-musl": path.resolve(__dirname, "./src/utils/empty-module.js"),
        "@rollup/rollup-darwin-x64": path.resolve(__dirname, "./src/utils/empty-module.js"),
        "@rollup/rollup-win32-x64-msvc": path.resolve(__dirname, "./src/utils/empty-module.js")
      }
    },
    optimizeDeps: {
      exclude: [
        "@rollup/rollup-linux-x64-gnu",
        "@rollup/rollup-linux-x64-musl",
        "@rollup/rollup-darwin-x64",
        "@rollup/rollup-win32-x64-msvc"
      ]
    }
  }
})
