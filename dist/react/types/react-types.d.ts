/**
 * React-specific types for creating consumer components.
 */
import { ElementType, PropsWithChildren, ReactElement, ReactNode, RefObject } from "react";
import { FinderConstructorOptions, FinderResultGroup, GroupByRule } from "../../types";
import { paginationInterface } from "../../core/pagination/pagination-interface";
import { selectedItemsInterface } from "../../core/selected-items/selected-items-interface";
import { metaInterface } from "../../core/meta/meta-interface";
import { layoutInterface } from "../../core/layout/layout-interface";
import { FinderCore } from "../../core/finder-core";
export interface FinderProps<FItem> extends FinderConstructorOptions<FItem>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderCore<FItem> | null>;
}
export interface FinderContentComponentProps {
    pagination: ReturnType<typeof paginationInterface>;
    meta: ReturnType<typeof metaInterface>;
    selectedItems: ReturnType<typeof selectedItemsInterface>;
    layout: ReturnType<typeof layoutInterface>;
}
export interface FinderItemsComponentProps<FItem> extends FinderContentComponentProps {
    items: FItem[];
}
export interface FinderGroupsComponentProps<FItem> extends FinderContentComponentProps {
    groups: FinderResultGroup<FItem>[];
    rule: GroupByRule;
}
export type FinderBaseRenderProp = ElementType<FinderContentComponentProps> | ReactElement<FinderContentComponentProps> | Iterable<ReactNode>;
