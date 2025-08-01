import { ElementType } from "react";
import { FinderItemsComponentProps } from "../types/react-types";
interface FinderItemsProps<FItem = any> {
    children: ElementType<FinderItemsComponentProps<FItem>>;
}
declare function FinderItems<FItem>({ children: renderProp }: FinderItemsProps<FItem>): import("react/jsx-runtime").JSX.Element | null;
export { FinderItems };
