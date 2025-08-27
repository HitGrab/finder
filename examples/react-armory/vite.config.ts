import checker from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    base: "./",
    plugins: [
        react(),
        checker({
            typescript: true,
        }),
        tsconfigPaths(),
    ],
    optimizeDeps: {
        force: true,
    },
    build: { assetsInlineLimit: 4096 * 10 },
});
