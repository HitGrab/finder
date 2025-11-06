/**
 * React-specific types for creating consumer components.
 */
import { ElementType, PropsWithChildren, RefObject } from "react";
import { FinderConstructorOptions, FinderResultGroup, PaginationMixinInterface } from "../../core/types/core-types";
import { StringMatchSegment } from "../../core/types/string-match-types";
import { FinderCore } from "../../core/finder-core";
export interface FinderProps<FItem, FContext> extends FinderConstructorOptions<FItem, FContext>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderCore<FItem, FContext> | null>;
}
export interface FinderContentProps<FItem = any, FContext = any> {
    empty: {
        pagination: PaginationMixinInterface;
        context: FContext;
    };
    loading: {
        pagination: PaginationMixinInterface;
        context: FContext;
    };
    noMatches: {
        pagination: PaginationMixinInterface;
        context: FContext;
    };
    items: {
        items: FItem[];
        pagination: PaginationMixinInterface;
        context: FContext;
    };
    groups: {
        groups: FinderResultGroup<FItem>[];
        pagination: PaginationMixinInterface;
        context: FContext;
    };
}
export type FinderCoreContextProps = [FinderCore, number];
export interface StringMatchSegmentProps {
    segment: StringMatchSegment;
    segmentIndex: number;
}
export type FinderSearchTermProp = keyof HTMLElementTagNameMap | ElementType | ElementType<StringMatchSegmentProps>;
