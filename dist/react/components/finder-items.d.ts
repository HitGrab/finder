import { ElementType } from "react";
import { FinderContentItemProps } from "../types/react-types";
interface FinderItemsProps<FItem = any> {
    children: ElementType<FinderContentItemProps<FItem>>;
}
declare function FinderItems<FItem>({ children: renderProp }: FinderItemsProps<FItem>): import("react/jsx-runtime").JSX.Element | null;
export { FinderItems };
