/**
 * React-specific types for creating consumer components.
 */

import { ElementType, PropsWithChildren, ReactElement, ReactNode, RefObject } from "react";
import { FinderConstructorOptions, FinderMeta, FinderResultGroup } from "../../types";
import { Finder as FinderCore } from "../../core/finder";
import { paginationInterface } from "../../core/pagination/pagination-interface";
import { selectedItemsInterface } from "../../core/selected-items/selected-items-interface";
import { metaInterface } from "../../core/meta/meta-interface";

export interface FinderProps<FItem> extends FinderConstructorOptions<FItem>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderCore<FItem> | null>;
}

export interface FinderBaseComponentProps {
    pagination: ReturnType<typeof paginationInterface>;
    meta: ReturnType<typeof metaInterface>;
    selectedItems: ReturnType<typeof selectedItemsInterface>;
}
export interface FinderItemsComponentProps<FItem> extends FinderBaseComponentProps {
    items: FItem[];
}
export interface FinderGroupsComponentProps<FItem> extends FinderBaseComponentProps {
    groups: FinderResultGroup<FItem>[];
}

export type FinderBaseRenderProp = ElementType<FinderBaseComponentProps> | ReactElement<FinderBaseComponentProps> | Iterable<ReactNode>;
