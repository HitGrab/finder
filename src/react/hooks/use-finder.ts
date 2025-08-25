import { use } from "react";
import { FinderContext } from "../providers/finder-context";

function useFinder() {
    const value = use(FinderContext);
    if (value === null) {
        throw new Error("useFinder requires a FinderContext.");
    }
    const [instance] = value;
    return instance;
}

export { useFinder };
