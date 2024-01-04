import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "assets", replacement: "/src/assets" },
      { find: "components", replacement: "/src/components" },
      { find: "pages", replacement: "/src/pages" },
      { find: "styles", replacement: "/src/styles" },
      { find: "shared", replacement: "/src/shared" },
      { find: "element", replacement: "/src/element" },
      { find: "state", replacement: "/src/state" },
      { find: "hooks", replacement: "/src/hooks" },
      { find: "utils", replacement: "/src/utils" },
    ],
  },
});
