import { FinderConfig } from "../types";

/**
 * Enforce constructor shape for a Finder config.
 */
export function finderConfig<FItem>(config: FinderConfig<FItem>) {
    return config;
}
