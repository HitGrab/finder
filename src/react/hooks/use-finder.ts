import { use } from "react";
import { FinderCoreContext } from "../providers/finder-core-context";
import { InjectedContext } from "../../types";
import { FinderCore } from "../../core/finder-core";

function useFinder<FItem = any, FContext extends InjectedContext | undefined = undefined>() {
    const value = use(FinderCoreContext);
    if (value === null) {
        throw new Error("useFinder requires a FinderContext.");
    }
    const [instance] = value;
    return instance as FinderCore<FItem, FContext>;
}

export { useFinder };
