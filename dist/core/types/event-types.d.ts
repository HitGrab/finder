import { FinderRule, FinderSnapshot } from "../../types";
export type FinderTouchSource = "core" | "filters" | "groupBy" | "pagination" | "search" | "sortBy";
type FinderSharedEventProps = {
    source: string;
    event: FinderEventName;
    snapshot: FinderSnapshot<any>;
    timestamp: number;
};
export interface FinderInitEvent extends FinderSharedEventProps {
    source: "core";
    event: "init";
}
export interface FinderFirstUserInteractionEvent extends FinderSharedEventProps {
    source: "core";
    event: "firstUserInteraction";
}
export interface FinderReadyEvent extends FinderSharedEventProps {
    source: "core";
    event: "ready";
}
export type FinderEvent = FinderInitEvent | FinderFirstUserInteractionEvent | FinderReadyEvent | FinderChangeEvent;
export type FinderOnInitCallback = (event: FinderInitEvent) => void;
export type FinderOnReadyCallback = (event: FinderReadyEvent) => void;
export type FinderOnFirstUserInteractCallback = (event: FinderFirstUserInteractionEvent) => void;
export type FinderOnChangeCallback = (event: FinderChangeEvent) => void;
export type FinderTouchCallback = (event: FinderTouchEvent) => void;
/**
 * Internal communication between mixins and core
 */
export interface FinderTouchEvent {
    source: FinderTouchSource;
    event: FinderEventName;
    current: any;
    initial: any;
    rule?: FinderRule;
}
/**
 * External type that consumers will receive
 */
export type FinderChangeEvent = FinderTouchEvent & FinderSharedEventProps;
export type FinderEventName = "init" | "firstUserInteraction" | "ready" | "change" | "change.core" | "change.core.setIsLoading" | "change.core.setIsDisabled" | "change.core.setItems" | "change.core.syncContext" | `change.filters` | "change.filters.set" | `change.groupBy` | "change.groupBy.set" | "change.groupBy.setGroupIdSortDirection" | "change.pagination" | "change.pagination.setPage" | "change.pagination.setNumItemsPerPage" | "change.search" | "change.search.setSearchTerm" | "change.search.reset" | "change.sortBy" | "change.sortBy.set" | "change.sortBy.setSortDirection";
export {};
