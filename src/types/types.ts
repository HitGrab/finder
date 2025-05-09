/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject } from 'react';

export interface useFinderFactoryOptions<FItem, FMeta> {
    // static config
    config: FinderConfig<FItem, FMeta> | undefined;

    // Initial stateful variables
    initialValues?: FinderStateSnapshot;

    // Initial meta
    initialMeta?: FMeta;

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

export interface FinderRootProps<FItem, FMeta> extends useFinderFactoryOptions<FItem, FMeta> {
    items: FItem[] | undefined | null;

    // Exposed ref for external control
    controllerRef?: RefObject<FinderCore<FItem, FMeta> | null>;
}

// A configuration is stable static data that ( ideally ) shouldn't change after construction.
export interface FinderConfig<FItem, FMeta> {
    // Optional string search predicate.
    searchFn?: (item: FItem, searchTerm: string) => boolean;

    // A list of all valid filter definitions
    filters?: FinderFilterDefinition<FItem>[];

    // All valid sortBy definitions
    sortBy?: FinderSortByDefinition<FItem, FMeta>[];

    // All valid groupBy definitions
    groupBy?: FinderGroupByDefinition<FItem, FMeta>[];

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
export interface FinderControlOption<FMeta> {
    label: string;
    value: string | number;
    disabled?: boolean;
    meta?: FMeta;
}

// Values are the initial stateful variables
export interface FinderStateSnapshot {
    filters?: Record<string, any>;
    searchTerm?: string;
    sortBy?: string;
    sortDirection?: FinderSortDirection;
    groupBy?: string;
}

export interface FinderCore<FItem, FMeta> {
    config?: FinderConfig<FItem, FMeta>;
    snapshot: FinderStateSnapshot;
    pagination?: FinderPagination;
    results: {
        items?: FItem[];
        groups?: FinderResultGroup<FItem>[];
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
        definitions?: FinderFilterDefinition<FItem, FMeta>[];
        set: (filterId: string, value?: any) => void;
        reset: (filterId: string) => void;
        toggle: (filterId: string) => void;
    };
    sortBy: {
        state?: string;
        definitions: FinderSortByDefinition<FItem, FMeta>[];
        direction?: FinderSortDirection;
        set: (sortByDefinitionId?: string, sortDirection?: FinderSortDirection) => void;
        cycleDirection: () => void;
    };
    groupBy: {
        state?: string;
        definitions: FinderGroupByDefinition<FItem, FMeta>[];
        required: boolean;
        set: (groupById: string, value?: string) => void;
        toggle: (groupById: string) => void;
    };
    meta: {
        state?: FMeta;
        set: (metaIdentifier: string, metaValue: any) => void;
        reset: (metaIdentifier: string) => void;
    };
}

/**
 * Context provided to all Finder consuming elements.
 */
export interface FinderContextProps<FItem, FMeta> extends FinderCore<FItem, FMeta> {
    items: FItem[];
    disabled: boolean;
    isLoading: boolean;
}

export interface FinderResultGroup<FItems, FGroupId extends string = string> {
    id: FGroupId;
    items: FItems[];
}

/**
 * A stateless filter object that will receive filterValues
 */
export interface FinderFilterDefinition<FItem, FValue = any, FMeta = any> {
    id: string;
    label: string;
    filterFn: (item: FItem, value: FValue, meta?: FMeta) => boolean;
    options?: FinderControlOption<FMeta>[] | ((meta?: FMeta) => FinderControlOption<FMeta>[]);
    multiple?: boolean;
    required?: boolean;
    is_boolean?: boolean;
    hidden?: boolean;
    // Component?: ElementType;
    // element?: (props: FinderFilterComponentProps<FItem, any, FMeta>) => ReactNode;
    side_effects?: (
        value: FValue,
        meta: FMeta
    ) => {
        reset?: string[];
        set?: Record<string, unknown>;
    };
}

export interface FinderFilterComponentProps<I, V, M> {
    filter: FinderFilterDefinition<I>;
    value: V;
    items: I[];
    onChange: (value?: V) => void;
    meta?: M;
}

export interface FinderGroupByDefinition<FItem, FMeta = any> {
    id: string;
    label: string;
    groupFn: FinderPropertySelector<FItem>;
    sortGroupIdFn?: FinderPropertySelector<FinderResultGroup<FItem[]>>;
    direction?: FinderSortDirection;
    hidden?: boolean;
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
    meta?: FMeta;
}

/*
 * Sort options require a selector method to sort by
 */
export interface FinderSortByDefinition<FItem, FMeta> {
    id: string;
    label: string;
    sortFn: FinderPropertySelector<FItem> | FinderPropertySelector<FItem>[];
    defaultDirection?: 'asc' | 'desc' | ('asc' | 'desc')[];
    meta?: FMeta;
}

export type FinderSortDirection = null | undefined | 'asc' | 'desc' | ('asc' | 'desc')[];

export interface FinderPagination {
    page: number;
    lastPage: number;
    numItems: number;
    numItemsPerPage: number;
    disabled: boolean;
}
