import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "happy-dom",
        onConsoleLog(log) {
            // filter out nuisance messages triggered during Node testing.
            if (log.includes("Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools")) return false;
        },
        css: { modules: { classNameStrategy: "scoped" }, include: /.module.*/ },
    },
});
