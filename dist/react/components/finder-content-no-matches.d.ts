import { FinderContentProps } from "../types/react-types";
import { ElementType, ReactNode } from "react";
interface FinderContentNoMatchesProps<FItem, FContext> {
    children: ElementType<FinderContentProps<FItem, FContext>["loading"]> | Iterable<ReactNode>;
}
declare function FinderContentNoMatches<FItem = any, FContext = any>({ children: Component }: FinderContentNoMatchesProps<FItem, FContext>): Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null;
export { FinderContentNoMatches };
