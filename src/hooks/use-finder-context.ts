import { use } from "react";
import { FinderContext } from "../context/finder-context";

function useFinderContext() {
    const value = use(FinderContext);
    if (value === null) {
        throw new Error("useFinderContext requires a FinderCoreContext.");
    }
    const [instance] = value;
    return instance;
}

export { useFinderContext };
