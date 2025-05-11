import { PropsWithChildren, RefObject } from "react";
import { useFinderFactoryOptions, FinderCore } from "../types";
export interface FinderProps<FItem> extends useFinderFactoryOptions<FItem>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderCore<FItem> | null>;
}
declare function Finder<FItem>({ items, config, disabled, isLoading, page, numItemsPerPage, initialMeta, initialSelectedItems, initialValues, onChange, children, controllerRef, }: FinderProps<FItem>): import("react/jsx-runtime").JSX.Element;
export { Finder };
