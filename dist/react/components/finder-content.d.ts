import { ElementType } from "react";
import { FinderContentRenderProp, FinderContentItemProps, FinderContentGroupProps } from "../types/react-types";
import { FinderContentLoading } from "./finder-content-loading";
import { FinderContentEmpty } from "./finder-content-empty";
import { FinderContentNoMatches } from "./finder-content-no-matches";
import { FinderContentItems } from "./finder-content-items";
import { FinderContentGroups } from "./finder-content-groups";
interface FinderContentProps<FItem, FContext> {
    children: {
        loading?: FinderContentRenderProp;
        empty?: FinderContentRenderProp;
        noMatches?: FinderContentRenderProp;
        items?: ElementType<FinderContentItemProps<FItem, FContext>>;
        groups?: ElementType<FinderContentGroupProps<FItem, FContext>>;
    };
}
declare function FinderContent<FItem = any, FContext = any>({ children: renderProps }: FinderContentProps<FItem, FContext>): (import("react/jsx-runtime").JSX.Element | undefined)[];
declare namespace FinderContent {
    var Loading: typeof FinderContentLoading;
    var Empty: typeof FinderContentEmpty;
    var NoMatches: typeof FinderContentNoMatches;
    var Items: typeof FinderContentItems;
    var Groups: typeof FinderContentGroups;
}
export { FinderContent };
