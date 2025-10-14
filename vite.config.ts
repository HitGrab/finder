import checker from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "finder",
            fileName: "index",
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                // Provide global variables to use in the UMD build for externalized deps
                globals: {
                    react: "react",
                    "react-dom": "react-dom",
                },
            },
        },
    },
    plugins: [
        react(),
        checker({
            typescript: true,
        }),
    ],
});
