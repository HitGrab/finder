/**
 * React-specific types for creating consumer components.
 */

import { ElementType, JSXElementConstructor, PropsWithChildren, ReactElement, ReactNode, RefObject } from "react";

import { FinderConstructorOptions, FinderMeta, FinderResultGroup } from "../../types";
import { Finder as FinderCore } from "../../core/finder";
import { paginationInterface } from "../../core/pagination/pagination-interface";
import { JSX } from "react";

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

export type FinderBaseRenderProp = ElementType<FinderBaseComponentProps> | ReactElement<FinderBaseComponentProps> | Iterable<ReactNode>;
