import { ElementType, ReactNode } from "react";
import { FinderContentProps } from "../types/react-types";
import { FinderContentLoading } from "./finder-content-loading";
import { FinderContentEmpty } from "./finder-content-empty";
import { FinderContentNoMatches } from "./finder-content-no-matches";
import { FinderContentItems } from "./finder-content-items";
import { FinderContentGroups } from "./finder-content-groups";
interface FinderContentContainerProps<FItem, FContext> {
    children: {
        loading?: ElementType<FinderContentProps<FItem, FContext>["loading"]> | Iterable<ReactNode>;
        empty?: ElementType<FinderContentProps<FItem, FContext>["empty"]> | Iterable<ReactNode>;
        noMatches?: ElementType<FinderContentProps<FItem, FContext>["noMatches"]> | Iterable<ReactNode>;
        items?: ElementType<FinderContentProps<FItem, FContext>["items"]> | Iterable<ReactNode>;
        groups?: ElementType<FinderContentProps<FItem, FContext>["groups"]> | Iterable<ReactNode>;
    };
}
declare function FinderContent<FItem = any, FContext = any>({ children: renderProps }: FinderContentContainerProps<FItem, FContext>): (import("react/jsx-runtime").JSX.Element | undefined)[];
declare namespace FinderContent {
    var Loading: typeof FinderContentLoading;
    var Empty: typeof FinderContentEmpty;
    var NoMatches: typeof FinderContentNoMatches;
    var Items: typeof FinderContentItems;
    var Groups: typeof FinderContentGroups;
}
export { FinderContent };
