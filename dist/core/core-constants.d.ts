export declare const EVENTS: {
    readonly INIT: "init";
    readonly FIRST_USER_INTERACTION: "firstUserInteraction";
    readonly READY: "ready";
    readonly CHANGE: "change";
    readonly SET_ITEMS: "change.core.setItems";
    readonly SET_IS_LOADING: "change.core.setIsLoading";
    readonly SET_IS_DISABLED: "change.core.setIsDisabled";
    readonly SET_CONTEXT: "change.core.syncContext";
    readonly SET_SEARCH_TERM: "change.search.setSearchTerm";
    readonly RESET_SEARCH_TERM: "change.search.reset";
    readonly SET_FILTER: "change.filters.set";
    readonly SET_SORT_BY: "change.sortBy.set";
    readonly SET_SORT_BY_DIRECTION: "change.sortBy.setSortDirection";
    readonly SET_GROUP_BY: "change.groupBy.set";
    readonly SET_GROUP_SORT_DIRECTION: "change.groupBy.setGroupIdSortDirection";
    readonly SET_PAGE: "change.pagination.setPage";
    readonly SET_NUM_ITEMS_PER_PAGE: "change.pagination.setNumItemsPerPage";
};
export declare const EVENT_SOURCE: {
    readonly CORE: "core";
    readonly SEARCH: "search";
    readonly FILTERS: "filters";
    readonly GROUP_BY: "groupBy";
    readonly SORT_BY: "sortBy";
    readonly PAGINATION: "pagination";
};
export declare const ERRORS: {
    RULE_NOT_FOUND: string;
    NO_SEARCH_RULE_SET: string;
    TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS: string;
    TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE: string;
    TOGGLING_OPTION_THAT_DOES_NOT_EXIST: string;
    TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS: string;
    INVALID_RULE_WITHOUT_ID: string;
    INVALID_RULE_SHAPE: string;
    INVALID_RULE_DUPLICATE: string;
};
