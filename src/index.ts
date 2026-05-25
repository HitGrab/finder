export type { FinderConstructorOptions, FinderResultGroup, SortDirection } from "./core/types/core-types";
export type {
    RuleDefinition,
    SearchRuleDefinition,
    SortByRuleDefinition,
    GroupByRuleDefinition,
    FilterRuleDefinition,
    FilterOption,
    RuleEffect,
    AnyFilterRuleDefinition,
} from "./core/types/rule-types";
export type { FinderEvent, FinderInitEvent, FinderReadyEvent, FinderFirstUserInteractionEvent, FinderChangeEvent } from "./core/types/event-types";
export type { FinderProps, FinderContentProps, StringMatchSegmentProps } from "./react/types/react-types";

export {
    finderRuleset,
    searchRule,
    filterRule,
    sortByRule,
    groupByRule,
    ruleEffect,
    transformFilterToSingleValue,
    transformFilterToMultiple,
    transformFilterToBoolean,
} from "./core/utils/rule-type-guards";
export { useFinder } from "./react/hooks/use-finder";
export { Finder } from "./react/components/finder";
export { useFinderRef } from "./react/hooks/use-finder-ref";
export { StringMatch } from "./react/components/string-match";
