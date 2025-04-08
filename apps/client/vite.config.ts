import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "path"
import fs from "fs"

// Create empty-module.js if it doesn't exist
const emptyModulePath = path.resolve(__dirname, "./src/utils/empty-module.js")
if (!fs.existsSync(path.dirname(emptyModulePath))) {
  fs.mkdirSync(path.dirname(emptyModulePath), { recursive: true })
}
if (!fs.existsSync(emptyModulePath)) {
  fs.writeFileSync(emptyModulePath, "export default {}")
}

// Try to import TanStackRouterVite, but handle if it's missing
let TanStackRouterVite;
try {
  const routerPlugin = require("@tanstack/router-plugin/vite");
  TanStackRouterVite = routerPlugin.TanStackRouterVite;
} catch (error) {
  console.warn("Warning: @tanstack/router-plugin not found, using placeholder");
  TanStackRouterVite = () => ({ name: 'tanstack-router-plugin-stub' });
}

const plugins = [tsconfigPaths(), TanStackRouterVite(), react()]

export default defineConfig(({ mode }) => {
  return {
    plugins,
    server: { 
      open: mode === "development",
      host: "0.0.0.0",
      watch: {
        usePolling: true,
      }
    },
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