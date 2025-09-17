import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      {
        find: "@/components",
        replacement: resolve(__dirname, "src/components"),
      },
      { find: "@/hooks", replacement: resolve(__dirname, "src/hooks") },
      { find: "@/services", replacement: resolve(__dirname, "src/services") },
      { find: "@/utils", replacement: resolve(__dirname, "src/utils") },
      { find: "@/types", replacement: resolve(__dirname, "src/types") },
      { find: "@/assets", replacement: resolve(__dirname, "src/assets") },
      { find: "@/lib", replacement: resolve(__dirname, "src/lib") },
    ],
  },
});
