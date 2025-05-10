import checker from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "finder",
            fileName: "index",
        },
        rollupOptions: {
            external: ["react", "react-dom"],
        },
    },
    plugins: [
        react(),
        checker({
            typescript: true,
        }),
        dts(),
    ],
});
