import { ElementType, ReactNode } from "react";
import { FinderContentProps } from "../..";
interface FinderContentGroupsProps<FItem, FContext> {
    children: ElementType<FinderContentProps<FItem, FContext>["groups"]> | Iterable<ReactNode>;
}
declare function FinderContentGroups<FItem = any, FContext = any>({ children: Component }: FinderContentGroupsProps<FItem, FContext>): Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null;
export { FinderContentGroups };
