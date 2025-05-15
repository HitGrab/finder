import { useRef } from "react";
import { FinderInstance } from "../types";

export function useFinderRef() {
    return useRef<FinderInstance<any>>(null);
}
