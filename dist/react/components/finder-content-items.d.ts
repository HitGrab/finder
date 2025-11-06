import { ElementType, ReactElement, ReactNode } from "react";
import { FinderContentProps } from "../types/react-types";
interface FinderContentItemsProps<FItem, FContext> {
    children: ElementType<FinderContentProps<FItem, FContext>["items"]> | ReactElement<FinderContentProps<FItem, FContext>["items"]> | Iterable<ReactNode>;
}
declare function FinderContentItems<FItem = any, FContext = any>({ children: Component }: FinderContentItemsProps<FItem, FContext>): Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null;
export { FinderContentItems };
