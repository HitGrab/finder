import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { App } from "./app";

const queryClient = new QueryClient();

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <Provider>
                    <App />
                </Provider>
            </QueryClientProvider>
        </React.StrictMode>,
    );
}
