import { ElementType } from "react";
import { FinderEmpty } from "./finder-empty";
import { FinderGroups } from "./finder-groups";
import { FinderItems } from "./finder-items";
import { FinderLoading } from "./finder-loading";
import { FinderNoMatches } from "./finder-no-matches";
import { FinderContentRenderProp, FinderContentItemProps, FinderContentGroupProps } from "../types/react-types";
interface FinderContentProps<FItem> {
    children: {
        loading?: FinderContentRenderProp;
        empty?: FinderContentRenderProp;
        noMatches?: FinderContentRenderProp;
        items?: ElementType<FinderContentItemProps<FItem>>;
        groups?: ElementType<FinderContentGroupProps<FItem>>;
    };
}
declare function FinderContent<FItem = any>({ children: renderProps }: FinderContentProps<FItem>): (import("react/jsx-runtime").JSX.Element | undefined)[];
declare namespace FinderContent {
    var Loading: typeof FinderLoading;
    var Empty: typeof FinderEmpty;
    var NoMatches: typeof FinderNoMatches;
    var Items: typeof FinderItems;
    var Groups: typeof FinderGroups;
}
export { FinderContent };
