import { useFinderFactoryOptions } from "../types";

/**
 * Enforce constructor shape for a Finder Options param.
 */
export function finderOptions<FItem>(options: useFinderFactoryOptions<FItem>) {
    return options;
}
