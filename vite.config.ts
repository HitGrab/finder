import checker from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
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
