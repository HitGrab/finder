/** Vanilla JS library */
export { Finder as FinderCore } from "./core/finder";
export { FinderPlugin } from "./core/plugins/plugin-super-class";

// Utility methods for enforcing rule shape
export { finderRuleset, searchRule, filterRule, sortByRule, groupByRule } from "./core/utils/rule-type-enforcers";

// String comparison utilities
export { finderStringCompare, finderCharacterCompare, finderSequentialCharacterCompare } from "./core/utils/string-compare-utils";

export type {
    FinderSnapshot,

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

    // events
    FinderEvent,
    FinderInitEvent,
    FinderReadyEvent,
    FinderFirstUserInteractionEvent,
    FinderChangeEvent,

    // meta
    LayoutVariant,

    // plugins
    FinderPluginFn,
    FinderPluginInterface,
} from "./types";

/**
 * React hooks and components
 */
export { useFinder } from "./react/hooks/use-finder";
export { useFinderContext } from "./react/hooks/use-finder-context";
export { FinderItems } from "./react/components/finder-items";
export { Finder } from "./react/components/finder";
export { FinderEmpty } from "./react/components/finder-empty";
export { FinderGroups } from "./react/components/finder-groups";
export { FinderLoading } from "./react/components/finder-loading";
export { FinderNoMatches } from "./react/components/finder-no-matches";
export { FinderContent } from "./react/components/finder-content";
export { useFinderRef } from "./react/hooks/use-finder-ref";

export type { FinderProps } from "./react/types/react-types";
