import { ElementType } from "react";
import { FinderContentGroupProps } from "../types/react-types";
interface FinderContentGroupsProps<FItem = any> {
    children: ElementType<FinderContentGroupProps<FItem>>;
}
declare function FinderContentGroups<FItem>({ children: Component }: FinderContentGroupsProps<FItem>): import("react/jsx-runtime").JSX.Element | null;
export { FinderContentGroups };
