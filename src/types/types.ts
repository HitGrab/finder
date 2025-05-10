/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, RefObject } from "react";

export interface useFinderFactoryOptions<FItem> {
    // static config
    config: FinderConfig<FItem> | undefined;

    // Initial stateful variables
    initialValues?: FinderStateSnapshot;

    // Initial meta
    initialMeta?: Map<any, any>;

    // If data is still being requested async
    isLoading?: boolean;

    // Whether to accept any commands
    disabled?: boolean;

    // Paginator properties
    page?: number;
    numItemsPerPage?: number;

    // When values are changed, a snapshot is emitted to listeners
    onChange?: (snapshot: FinderStateSnapshot) => void;
}

export interface FinderProps<FItem> extends useFinderFactoryOptions<FItem>, PropsWithChildren {
    items: FItem[] | undefined | null;

    // Exposed ref for external control
    controllerRef?: RefObject<FinderCore<FItem> | null>;
}

// A configuration is stable static data that ( ideally ) shouldn't change after construction.
export interface FinderConfig<FItem> {
    // Optional string search predicate.
    searchFn?: (item: FItem, searchTerm: string) => boolean;

    // A list of all valid filter definitions
    filters?: FinderFilterDefinition<FItem>[];

    // All valid sortBy definitions
    sortBy?: FinderSortByDefinition<FItem>[];

    // All valid groupBy definitions
    groupBy?: FinderGroupByDefinition<FItem>[];

    // If this view requires a group, set it true here.
    requireGroup?: boolean;

    onInit?: () => void;
}

/**
 * Select a property from the item to sort by.
 */
export type FinderPropertySelector<FItem> = (item: FItem) => string | number;

/**
 * Describes the display of a filter or sort option.
 */
export interface FinderControlOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

// Values are the initial stateful variables
export interface FinderStateSnapshot {
    filters?: Record<string, any>;
    searchTerm?: string;
    sortBy?: string;
    sortDirection?: FinderSortDirection;
    groupBy?: string;
}

export interface FinderCore<FItem> {
    config?: FinderConfig<FItem>;
    snapshot: FinderStateSnapshot;
    pagination?: FinderPagination;
    results: {
        items?: FItem[];
        groups?: FinderResultGroup<FItem>[];
        numTotalItems?: number;
    };
    isEmpty: boolean;
    isLoading: boolean;
    search: {
        state?: string;
        disabled: boolean;
        set: (value?: string) => void;
    };
    filters: {
        state?: FinderStateSnapshot;
        definitions?: FinderFilterDefinition<FItem>[];
        set: (filterId: string, value?: any) => void;
        reset: (filterId: string) => void;
        toggle: (filterId: string) => void;
    };
    sortBy: {
        state?: string;
        definitions: FinderSortByDefinition<FItem>[];
        direction?: FinderSortDirection;
        set: (sortByDefinitionId?: string, sortDirection?: FinderSortDirection) => void;
        cycleDirection: () => void;
    };
    groupBy: {
        state?: string;
        definitions: FinderGroupByDefinition<FItem>[];
        required: boolean;
        set: (groupById: string, value?: string) => void;
        toggle: (groupById: string) => void;
    };
    meta: {
        state?: Map<any, any>;
        set: (metaIdentifier: string, metaValue: any) => void;
        reset: (metaIdentifier: string) => void;
    };
}

/**
 * Context provided to all Finder consuming elements.
 */
export interface FinderContextProps<FItem> extends FinderCore<FItem> {
    items: FItem[];
    disabled: boolean;
    isLoading: boolean;
}

export interface FinderResultGroup<FItems> {
    id: string;
    items: FItems[];
}

/**
 * A stateless filter object that will receive filterValues
 */
export interface FinderFilterDefinition<FItem, FValue = any> {
    id: string;
    filterFn: (item: FItem, value: FValue, meta?: Map<any, any>) => boolean;
    options?: FinderControlOption[] | ((meta?: Map<any, any>) => FinderControlOption[]);
    multiple?: boolean;
    required?: boolean;
    is_boolean?: boolean;
    side_effects?: (
        value: FValue,
        meta?: Map<any, any>,
    ) => {
        reset?: string[];
        set?: Record<string, unknown>;
    };
}

export interface FinderGroupByDefinition<FItem> {
    id: string;
    groupFn: FinderPropertySelector<FItem>;
    sortGroupIdFn?: FinderPropertySelector<FinderResultGroup<FItem[]>>;
    direction?: FinderSortDirection;
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
}

/*
 * Sort options require a selector method to sort by
 */
export interface FinderSortByDefinition<FItem> {
    id: string;
    sortFn: FinderPropertySelector<FItem> | FinderPropertySelector<FItem>[];
    defaultDirection?: "asc" | "desc" | ("asc" | "desc")[];
}

export type FinderSortDirection = null | undefined | "asc" | "desc" | ("asc" | "desc")[];

export interface FinderPagination {
    page: number;
    lastPage: number;
    numTotalItems: number;
    numItemsPerPage: number;
    disabled: boolean;
}
