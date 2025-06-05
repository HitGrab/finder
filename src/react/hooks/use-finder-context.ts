import { use } from "react";
import { FinderContext } from "../providers/finder-context";

function useFinderContext() {
    const value = use(FinderContext);
    if (value === null) {
        throw new Error("useFinderContext requires a FinderContext.");
    }
    const [instance] = value;
    return instance;
}

export { useFinderContext };
