/**
 * React-specific types for creating consumer components.
 */
import { ElementType, PropsWithChildren, ReactElement, ReactNode, RefObject } from "react";
import { paginationInterface } from "../../core/pagination/pagination-interface";
import { FinderCore } from "../../core/finder-core";
import { FinderConstructorOptions, FinderResultGroup } from "../../core/types/core-types";
import { StringMatchSegment } from "../../core/types/string-match-types";
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
}
export type FinderContentRenderProp = ElementType<FinderContentProps> | ReactElement<FinderContentProps> | Iterable<ReactNode>;
export interface StringMatchSegmentProps {
    segment: StringMatchSegment;
    segmentIndex: number;
}
export type FinderSearchTermProp = keyof HTMLElementTagNameMap | ElementType | ElementType<StringMatchSegmentProps>;
