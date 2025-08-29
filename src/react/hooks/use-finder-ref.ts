import { useRef } from "react";
import { FinderCore } from "../../core/finder-core";

export function useFinderRef<FItem = any, FContext = any>() {
    return useRef<FinderCore<FItem, FContext>>(null);
}
