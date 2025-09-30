export declare const EVENTS: {
    readonly INIT: "init";
    readonly FIRST_USER_INTERACTION: "firstUserInteraction";
    readonly READY: "ready";
    readonly CHANGE: "change";
    readonly SET_ITEMS: "setItems";
    readonly SET_IS_LOADING: "setIsLoading";
    readonly SET_IS_DISABLED: "setIsDisabled";
    readonly SET_CONTEXT: "setContext";
    readonly SET_SEARCH_TERM: "setSearchTerm";
    readonly RESET_SEARCH_TERM: "resetSearchTerm";
    readonly SET_FILTER: "setFilter";
    readonly SET_SORT_BY: "setSortBy";
    readonly SET_SORT_BY_DIRECTION: "setSortDirection";
    readonly SET_GROUP_BY: "setGroupBy";
    readonly SET_GROUP_SORT_BY_DIRECTION: "setGroupBySortDirection";
    readonly SET_PAGE: "setPage";
    readonly SET_NUM_ITEMS_PER_PAGE: "setNumItemsPerPage";
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
    WRONG_RULE_TYPE_FOR_MIXIN: string;
    NO_SEARCH_RULE_SET: string;
    TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS: string;
    TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE: string;
    TOGGLING_OPTION_THAT_DOES_NOT_EXIST: string;
    TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS: string;
    INVALID_RULE_WITHOUT_ID: string;
    INVALID_RULE_SHAPE: string;
    INVALID_RULE_DUPLICATE: string;
};
