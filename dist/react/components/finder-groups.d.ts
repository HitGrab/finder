import { ElementType } from "react";
import { FinderGroupsComponentProps } from "../types/react-types";
interface FinderGroupsProps<FItem = any> {
    children: ElementType<FinderGroupsComponentProps<FItem>>;
}
declare function FinderGroups<FItem>({ children: renderProp }: FinderGroupsProps<FItem>): import("react/jsx-runtime").JSX.Element | null;
export { FinderGroups };
