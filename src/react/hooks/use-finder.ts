import { useContext } from "react";
import { FinderCoreContext } from "../providers/finder-core-context";
import { FinderCore } from "../../core/finder-core";

function useFinder<FItem = any, FContext = undefined>() {
    const value = useContext(FinderCoreContext);
    if (value === null) {
        throw new Error("useFinder requires a FinderContext.");
    }
    const [instance] = value;

    // Typescript can't parse types from context, so we cast 'em.
    return instance as FinderCore<FItem, FContext>;
}

export { useFinder };
