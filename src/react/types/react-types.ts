/**
 * React-specific types for creating consumer components.
 */

import { ElementType, PropsWithChildren, ReactElement, ReactNode, RefObject } from "react";
import { FinderConstructorOptions, FinderResultGroup, GroupByRule, InjectedContext } from "../../types";
import { paginationInterface } from "../../core/pagination/pagination-interface";
import { selectedItemsInterface } from "../../core/selected-items/selected-items-interface";
import { layoutInterface } from "../../core/layout/layout-interface";
import { FinderCore } from "../../core/finder-core";

export interface FinderProps<FItem> extends FinderConstructorOptions<FItem>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderCore<FItem> | null>;
}

export interface FinderContentProps {
    pagination: ReturnType<typeof paginationInterface>;
    context?: InjectedContext;
    selectedItems: ReturnType<typeof selectedItemsInterface>;
    layout: ReturnType<typeof layoutInterface>;
}
export interface FinderContentItemProps<FItem> extends FinderContentProps {
    items: FItem[];
}
export interface FinderContentGroupProps<FItem> extends FinderContentProps {
    groups: FinderResultGroup<FItem>[];
    rule: GroupByRule;
}

export type FinderContentRenderProp = ElementType<FinderContentProps> | ReactElement<FinderContentProps> | Iterable<ReactNode>;
