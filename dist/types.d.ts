/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementType, PropsWithChildren, ReactNode, RefObject } from "react";

export interface useFinderFactoryOptions<FItem> {
    // static config
    config: FinderConfig<FItem> | undefined;

    // Initial stateful variables
    initialValues?: FinderStateSnapshot;

    // Initial meta
    initialMeta?: FinderMeta;

    // Initial selected items
    initialSelectedItems?: FItem[];

    // If data is still being requested async
    isLoading?: boolean;

    // Whether to accept any commands
    disabled?: boolean;

    // Paginator properties
    page?: number;
    numItemsPerPage?: number;

    // When values are changed, a snapshot is emitted to listeners
    onChange?: (diff: FinderStateSnapshot, snapshot: FinderStateSnapshot) => void;
}

// A configuration is a stable object that ( ideally ) shouldn't change after construction.
export interface FinderConfig<FItem> {
    // Optional string search predicate.
    searchFn?: FinderSearchFunction<FItem>;

    // A list of all valid filter definitions
    filters?: FinderFilterDefinition<FItem>[];

    // All valid sortBy definitions
    sortBy?: FinderSortByDefinition<FItem>[];

    // All valid groupBy definitions
    groupBy?: FinderGroupByDefinition<FItem>[];

    // If this view requires a group, set it true here.
    requireGroup?: boolean;

    // determine how many items can be selected
    maxSelectedItems?: number;

    onInit?: () => void;
}

// Values are the initial stateful variables
export interface FinderStateSnapshot<FItem = any> {
    filters?: Record<string, any>;
    searchTerm?: string;
    sortBy?: string;
    sortDirection?: FinderSortDirection;
    groupBy?: string;
    selectedItems?: FItem[];
    meta?: FinderMeta;
}

export interface FinderCore<FItem> {
    pagination?: FinderPagination;
    results: {
        items?: FItem[];
        groups?: FinderResultGroup<FItem>[];
        numTotalItems?: number;
    };
    isEmpty: boolean;
    isLoading: boolean;
    disabled: boolean;
    search: {
        state?: string;
        disabled: boolean;
        set: (value?: string) => void;
    };
    filters: {
        state?: FinderStateSnapshot;
        definitions?: FinderFilterDefinition<FItem>[];
        set: (filterId: string, value?: any) => void;
        get: (filterId: string) => any;
        delete: (filterId: string) => void;
        toggle: (filterId: string) => void;
        test: (filterDefinition: FinderFilterDefinition<FItem>, filterState: any, meta?: FinderMeta) => FItem[];
        testOptions: (filterDefinition: FinderFilterDefinition<FItem>, meta?: FinderMeta) => Map<FinderFilterOption | boolean, number>;
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
        reset: () => void;
    };
    selectedItems: {
        state?: FItem[];
        select: (item: FItem) => void;
        delete: (item: FItem) => void;
        isSelected: (item: FItem) => boolean;
        reset: () => void;
    };
    meta: {
        state?: FinderMeta;
        set: (metaIdentifier: any, metaValue: any) => void;
        get: (metaIdentifier: any) => any;
        delete: (metaIdentifier: any) => void;
        reset: () => void;
    };
}

export interface FinderResultGroup<FItems> {
    id: string;
    items: FItems[];
}
export type FinderMeta = Map<any, any>;

export type FinderSearchFunction<FItem> = (item: FItem, searchTerm: string) => boolean;

export interface FinderFilterDefinition<FItem, FValue = any> extends FinderFilterControlDisplay<FItem, FValue> {
    id: string;
    filterFn: (item: FItem, value: FValue, meta?: FinderMeta) => boolean;
    options?: FinderFilterOption[] | ((meta?: FinderMeta) => FinderFilterOption[]);
    multiple?: boolean;
    required?: boolean;
    is_boolean?: boolean;
    side_effects?: (
        value: FValue,
        meta?: FinderMeta,
    ) => {
        reset?: string[];
        set?: Record<string, unknown>;
    };
    label?: string;
    Component?: ElementType;
    element?: (props: FinderFilterComponentProps<Fitem, FValue, FinderFilterDefinition>) => ReactNode;
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

export interface FinderContentComponentProps<FItem = any> {
    children: {
        loading?: ElementType | ReactNode;
        empty?: ElementType | ReactNode;
        items?: ElementType<FinderItemsComponentProps<FItem>>;
        groups?: ElementType<FinderGroupsComponentProps<FItem>>;
    };
}

export interface FinderItemsComponentProps<FItem> {
    items: FItem[];
    pagination?: FinderPagination;
    meta?: FinderMeta;
}
export interface FinderGroupsComponentProps<FItem> {
    groups: FinderResultGroup<FItem>[];
    pagination?: FinderPagination;
    meta?: FinderMeta;
}

export interface FinderFilterComponentProps<FItem, FValue, FDefinition> {
    definition: FDefinition<FItem>;
    value: FValue;
    meta?: FinderMeta;
    onChange: (value?: FValue) => void;
}

export interface FinderFilterControlDisplay<Fitem, FValue> extends FinderControlDisplay {
    element?: (props: FinderFilterComponentProps<Fitem, FValue, FinderFilterDefinition>) => ReactNode;
}
export interface FinderGroupByControlDisplay<Fitem, FValue> extends FinderControlDisplay {
    element?: (props: FinderFilterComponentProps<Fitem, FValue, FinderGroupByDefinition>) => ReactNode;
}
export interface FinderSortByControlDisplay<Fitem, FValue> extends FinderControlDisplay {
    element?: (props: FinderFilterComponentProps<Fitem, FValue, FinderSortByDefinition>) => ReactNode;
}

export interface FinderControlDisplay {
    label?: string;
    Component?: ElementType;
}

/**
 * Select a property from the item to sort by.
 */
export type FinderPropertySelector<FItem> = (item: FItem) => string | number;

/**
 * Describes the display of a filter or sort option.
 */
export interface FinderFilterOption {
    label: string;
    value: any;
    disabled?: boolean;
}
