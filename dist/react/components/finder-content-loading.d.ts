import { FinderContentProps } from "../types/react-types";
import { ElementType, ReactNode } from "react";
interface FinderContentLoadingProps<FItem, FContext> {
    children: ElementType<FinderContentProps<FItem, FContext>["loading"]> | Iterable<ReactNode>;
}
declare function FinderContentLoading<FItem, FContext>({ children: Component }: FinderContentLoadingProps<FItem, FContext>): Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null;
export { FinderContentLoading };
