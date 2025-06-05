import { FinderEventNames } from "../types/core-types";

export const FINDER_EVENTS = {
    // internal touch event that is not emitted
    INIT: "init",
    CHANGE: "change",
    SET_SEARCH_TERM: "setSearchTerm",
    SET_FILTER: "setFilter",
    SET_SORT_BY: "setSortBy",
    SET_GROUP_BY: "setGroupBy",
    SET_META: "setMeta",
    TOGGLE_SELECTED_ITEM: "toggleSelectedItem",
} as const satisfies Record<string, FinderEventNames>;
