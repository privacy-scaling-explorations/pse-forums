import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig, type ServerOptions, type UserConfigExport } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const devServerOptions: ServerOptions = {
  open: true,
  proxy: {
    "/mock": {
      target: "http://localhost:3000",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/mock/, "/api/v1"),
    },
  },
}
const plugins = [tsconfigPaths(), TanStackRouterVite(), react()]
const defaultConfig: UserConfigExport = {
  plugins,
}

export default defineConfig(({ mode }) => {
  return mode === "development"
    ? { ...defaultConfig, server: devServerOptions }
    : defaultConfig
})
