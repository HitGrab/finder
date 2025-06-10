/**
 * React-specific types for creating consumer components.
 */

import { PropsWithChildren, RefObject } from "react";

import { FinderConstructorOptions, FinderMeta, FinderResultGroup, GroupByRule } from "../../types";
import { Finder as FinderCore } from "../../core/finder";
import { paginationInterface } from "../../core/pagination/pagination-interface";

export interface FinderProps<FItem> extends FinderConstructorOptions<FItem>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderCore<FItem> | null>;
}

export interface FinderBaseComponentProps {
    pagination?: ReturnType<typeof paginationInterface>;
    meta?: FinderMeta;
}
export interface FinderItemsComponentProps<FItem> extends FinderBaseComponentProps {
    items: FItem[];
    selectedItems: FItem[];
}
export interface FinderGroupsComponentProps<FItem> extends FinderBaseComponentProps {
    groups: FinderResultGroup<FItem>[];
    selectedItems: FItem[];
}
