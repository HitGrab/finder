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
export interface FinderItemsComponentProps<FItem> {
    items: FItem[];
    pagination?: ReturnType<typeof paginationInterface>;
    meta?: FinderMeta;
}
export interface FinderGroupsComponentProps<FItem> {
    groups: FinderResultGroup<FItem>[];
    pagination?: ReturnType<typeof paginationInterface>;
    meta?: FinderMeta;
    rule?: GroupByRule;
}
