import checker from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";

export default defineConfig({
    base: "./",
    build: {
        manifest: true,
        lib: {
            entry: resolve(__dirname, "lib/index.js"),
            name: "Finder",
        },
        rollupOptions: {
            external: ["happy-dom", "react", "vite", "vitest"],

            // output: {
            //     // Provide global variables to use in the UMD build
            //     // for externalized deps
            //     globals: {
            //         vue: "Vue",
            //     },
            // },
        },
    },
    plugins: [
        react(),
        checker({
            typescript: true,
        }),
    ],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
