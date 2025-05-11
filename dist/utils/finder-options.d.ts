import { useFinderFactoryOptions } from "../types";
/**
 * Enforce constructor shape for a Finder Options param.
 */
export declare function finderOptions<FItem>(options: useFinderFactoryOptions<FItem>): useFinderFactoryOptions<FItem>;
