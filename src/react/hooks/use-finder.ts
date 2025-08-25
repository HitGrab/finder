import { use } from "react";
import { FinderCoreContext } from "../providers/finder-core-context";

function useFinder() {
    const value = use(FinderCoreContext);
    if (value === null) {
        throw new Error("useFinder requires a FinderContext.");
    }
    const [instance] = value;
    return instance;
}

export { useFinder };
