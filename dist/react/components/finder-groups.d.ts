import { ElementType } from "react";
import { FinderContentGroupProps } from "../types/react-types";
interface FinderGroupsProps<FItem = any> {
    children: ElementType<FinderContentGroupProps<FItem>>;
}
declare function FinderGroups<FItem>({ children: renderProp }: FinderGroupsProps<FItem>): import("react/jsx-runtime").JSX.Element | null;
export { FinderGroups };
