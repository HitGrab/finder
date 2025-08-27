// Utility methods for enforcing rule shape
export { finderRuleset, searchRule, filterRule, sortByRule, groupByRule } from "./core/utils/rule-type-enforcers";

export { getSearchResultSegments } from "./core/search/result-segments/search-result-segments";

export type {
    FinderSnapshot,
    FinderConstructorOptions,

    // rules
    FinderRule,
    SearchRule,
    FilterRule,
    HydratedFilterRule,
    FilterRuleUnion,
    SortByRule,
    GroupByRule,
    FinderResultGroup,
    FilterOption,

    // rule helpers
    SortDirection,
} from "./types";

export type { FinderEvent, FinderInitEvent, FinderReadyEvent, FinderFirstUserInteractionEvent, FinderChangeEvent } from "./core/types/event-types";

/**
 * React hooks and components
 */
export { useFinder } from "./react/hooks/use-finder";
export { Finder } from "./react/components/finder";
export { FinderContent } from "./react/components/finder-content";
export { FinderSearchTerm } from "./react/components/finder-search-term";
export { useFinderRef } from "./react/hooks/use-finder-ref";

export type {
    FinderProps,
    FinderContentProps as FinderContentComponentProps,
    FinderContentGroupProps as FinderGroupsComponentProps,
    FinderContentItemProps as FinderItemsComponentProps,
} from "./react/types/react-types";
