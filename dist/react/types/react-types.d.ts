/**
 * React-specific types for creating consumer components.
 */
import { ElementType, PropsWithChildren, ReactElement, ReactNode, RefObject } from "react";
import { paginationInterface } from "../../core/pagination/pagination-interface";
import { FinderCore } from "../../core/finder-core";
import { GroupByRule } from "../../core/types/rule-types";
import { FinderConstructorOptions, FinderResultGroup } from "../../core/types/core-types";
export interface FinderProps<FItem, FContext> extends FinderConstructorOptions<FItem, FContext>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderCore<FItem, FContext> | null>;
}
export interface FinderContentProps<FContext = any> {
    pagination: ReturnType<typeof paginationInterface>;
    context?: FContext;
}
export interface FinderContentItemProps<FItem, FContext = any> extends FinderContentProps<FContext> {
    items: FItem[];
}
export interface FinderContentGroupProps<FItem, FContext = any> extends FinderContentProps<FContext> {
    groups: FinderResultGroup<FItem>[];
    rule: GroupByRule;
}
export type FinderContentRenderProp = ElementType<FinderContentProps> | ReactElement<FinderContentProps> | Iterable<ReactNode>;
