import { useRef } from "react";
import { Finder as FinderCore } from "../../core/finder";

export function useFinderRef() {
    return useRef<FinderCore<any>>(null);
}
