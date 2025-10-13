// Core
export type { FinderConstructorOptions, FinderResultGroup, SortDirection } from "./core/types/core-types";

// Rules
export { finderRuleset, searchRule, filterRule, sortByRule, groupByRule, ruleEffect, searchEffect } from "./core/utils/rule-type-enforcers";
export type { FinderRule, SearchRule, SortByRule, GroupByRule, FilterRule, HydratedFilterRule, FilterRuleUnion, FilterOption } from "./core/types/rule-types";
export type { RuleEffect, SearchEffect } from "./core/types/effect-types";

// Events
export type { FinderEvent, FinderInitEvent, FinderReadyEvent, FinderFirstUserInteractionEvent, FinderChangeEvent } from "./core/types/event-types";

/**
 * React hooks and components
 */
export { useFinder } from "./react/hooks/use-finder";
export { Finder } from "./react/components/finder";
export { useFinderRef } from "./react/hooks/use-finder-ref";
export { StringMatch } from "./react/components/string-match";

export type { FinderProps, FinderContentProps, StringMatchSegmentProps } from "./react/types/react-types";
