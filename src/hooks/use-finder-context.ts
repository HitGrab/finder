import { use } from "react";
import { FinderContext } from "../context/finder-context";

function useFinderContext() {
    const value = use(FinderContext);
    if (value === null) {
        throw new Error("useFinderContext requires a FinderCoreContext.");
    }
    return value;
}

export { useFinderContext };
