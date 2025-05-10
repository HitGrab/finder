import checker from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "finder",
            fileName: "finder",
        },
        emptyOutDir: true,
        rollupOptions: {
            external: ["happy-dom", "react", "react-dom", "vite", "vitest"],
        },
    },
    plugins: [
        react(),
        checker({
            typescript: true,
        }),
    ],
});
