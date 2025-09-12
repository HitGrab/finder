import { FinderEventName, FinderTouchSource } from "./types/event-types";

type EventList = Record<string, FinderEventName>;
type EventSourceList = Record<string, FinderTouchSource>;

export const EVENTS = {
    INIT: "init",
    FIRST_USER_INTERACTION: "firstUserInteraction",
    READY: "ready",
    CHANGE: "change",
    SET_ITEMS: "change.core.setItems",
    SET_IS_LOADING: "change.core.setIsLoading",
    SET_IS_DISABLED: "change.core.setIsDisabled",
    SET_CONTEXT: "change.core.syncContext",
    SET_SEARCH_TERM: "change.search.setSearchTerm",
    RESET_SEARCH_TERM: "change.search.reset",
    SET_FILTER: "change.filters.set",
    SET_SORT_BY: "change.sortBy.set",
    SET_SORT_BY_DIRECTION: "change.sortBy.setSortDirection",
    SET_GROUP_BY: "change.groupBy.set",
    SET_GROUP_SORT_DIRECTION: "change.groupBy.setGroupIdSortDirection",
    SET_PAGE: "change.pagination.setPage",
    SET_NUM_ITEMS_PER_PAGE: "change.pagination.setNumItemsPerPage",
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
