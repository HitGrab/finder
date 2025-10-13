import { FinderContentProps } from "../types/react-types";
import { ElementType, ReactNode } from "react";
interface FinderContentEmptyProps<FItem, FContext> {
    children: ElementType<FinderContentProps<FItem, FContext>["empty"]> | Iterable<ReactNode>;
}
declare function FinderContentEmpty<FItem = any, FContext = any>({ children: Component }: FinderContentEmptyProps<FItem, FContext>): Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null;
export { FinderContentEmpty };
