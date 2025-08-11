import { useRef } from "react";
import { FinderCore } from "../../core/finder-core";

export function useFinderRef() {
    return useRef<FinderCore<any>>(null);
}
