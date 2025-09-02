import { ElementType } from "react";
import { FinderContentItemProps } from "../types/react-types";
interface FinderContentItemsProps<FItem = any> {
    children: ElementType<FinderContentItemProps<FItem>>;
}
declare function FinderContentItems<FItem>({ children: Component }: FinderContentItemsProps<FItem>): import("react/jsx-runtime").JSX.Element | null;
export { FinderContentItems };
