type EventList = Record<string, string>;
type EventSourceList = Record<string, string>;

export const EVENTS = {
    INIT: "init",
    FIRST_USER_INTERACTION: "firstUserInteraction",
    READY: "ready",
    CHANGE: "change",
    SET_ITEMS: "setItems",
    SET_IS_LOADING: "setIsLoading",
    SET_IS_DISABLED: "setIsDisabled",
    SET_CONTEXT: "setContext",
    SET_SEARCH_TERM: "setSearchTerm",
    RESET_SEARCH_TERM: "resetSearchTerm",
    SET_FILTER: "setFilter",
    SET_SORT_BY: "setSortBy",
    SET_SORT_BY_DIRECTION: "setSortDirection",
    SET_GROUP_BY: "setGroupBy",
    SET_GROUP_SORT_BY_DIRECTION: "setGroupBySortDirection",
    SET_PAGE: "setPage",
    SET_NUM_ITEMS_PER_PAGE: "setNumItemsPerPage",
} as const satisfies EventList;

export const EVENT_SOURCE = {
    CORE: "core",
    SEARCH: "search",
    FILTERS: "filters",
    GROUP_BY: "groupBy",
    SORT_BY: "sortBy",
    PAGINATION: "pagination",
} as const satisfies EventSourceList;

export const ERRORS = {
    RULE_NOT_FOUND: "Finder could not locate requested rule",
    NO_SEARCH_RULE_SET: "Unable to set search term; no SearchRule was found.",
    TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS: "Finder could not toggle this filter rule option, as the filter does not have any options.",
    TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE: "Finder could not toggle this filter rule option, as the rule does not allow multiple values.",
    TOGGLING_OPTION_THAT_DOES_NOT_EXIST: "Finder could not toggle this filter rule option, as the option was not found.",
    TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS: "Finder was unable to test the options for this filter rule. It must be a boolean or have defined options.",
    INVALID_RULE_WITHOUT_ID: "Init failed: Missing rule id.",
    INVALID_RULE_SHAPE: "Init failed: Malformed rule definition",
    INVALID_RULE_DUPLICATE: "Init failed: Duplicate rule id.",
};
