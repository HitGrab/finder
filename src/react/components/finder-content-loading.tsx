import { FinderContentProps } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";
import { ElementType } from "react";

interface FinderContentLoadingProps<FItem, FContext> {
    children: ElementType<FinderContentProps<FItem, FContext>["loading"]>;
}
function FinderContentLoading<FItem, FContext>({ children: Component }: FinderContentLoadingProps<FItem, FContext>) {
    const finder = useFinder();
    if (finder.isLoading) {
        if (typeof Component === "function") {
            return <Component pagination={finder.pagination} context={finder.context as FContext} />;
        }

        return Component;
    }
    return null;
}

export { FinderContentLoading };
