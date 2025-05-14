import { PropsWithChildren, RefObject } from "react";
import { FinderConstructorOptions, FinderInstance } from "../types";
export interface FinderProps<FItem> extends FinderConstructorOptions<FItem>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderInstance<FItem> | null>;
}
declare function Finder<FItem>({ items, rules, initialSearchTerm, initialSortby, initialSortDirection, initialGroupBy, initialFilters, initialMeta, initialSelectedItems, maxSelectedItems, isLoading, disabled, page, numItemsPerPage, requireGroup, onInit, onChange, children, controllerRef, }: FinderProps<FItem>): import("react/jsx-runtime").JSX.Element;
export { Finder };
