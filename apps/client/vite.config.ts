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
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // Ensure @ resolves to src/
      },
    },
  }
})
