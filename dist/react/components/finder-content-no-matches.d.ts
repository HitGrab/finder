import { FinderContentProps } from "../types/react-types";
import { ElementType, ReactElement, ReactNode } from "react";
interface FinderContentNoMatchesProps<FItem, FContext> {
    children: ElementType<FinderContentProps<FItem, FContext>["noMatches"]> | ReactElement<FinderContentProps<FItem, FContext>["noMatches"]> | Iterable<ReactNode>;
}
declare function FinderContentNoMatches<FItem = any, FContext = any>({ children: Component }: FinderContentNoMatchesProps<FItem, FContext>): Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null;
export { FinderContentNoMatches };
