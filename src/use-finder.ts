import { use } from "react";
import { FinderContext } from "./finder-context";

function useFinder() {
    const value = use(FinderContext);
    if (value === null) {
        throw new Error("useFinder requires a FinderCoreContext.");
    }
    return value;
}

export { useFinder };
