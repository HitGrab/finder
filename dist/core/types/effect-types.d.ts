import { FinderCore } from "../finder-core";
import { FinderRuleDefinition } from "./rule-types";
export interface RuleEffect<FItem = any, FContext = any> {
    rules: string | FinderRuleDefinition<FItem> | (string | FinderRuleDefinition<FItem>)[] | ((items: FItem[], context: FContext) => string | FinderRuleDefinition<FItem> | (string | FinderRuleDefinition<FItem>)[]);
    onChange: (instance: FinderCore<FItem, FContext>, rule: FinderRuleDefinition<FItem>) => void;
}
export interface HydratedRuleEffect<FItem = any, FContext = any> {
    rules: (string | FinderRuleDefinition<FItem>)[];
    onChange: (instance: FinderCore<FItem, FContext>, rule: FinderRuleDefinition<FItem>) => void;
    _isHydrated: true;
}
export interface SearchEffect<FItem = any, FContext = any> {
    haystack: string | string[] | ((items: FItem[], context: FContext) => string | string[]);
    onChange: (instance: FinderCore<FItem, FContext>, searchTerm: string) => void;
}
export interface HydratedSearchEffect<FItem = any, FContext = any> {
    haystack: string[];
    onChange: (instance: FinderCore<FItem, FContext>, searchTerm: string) => void;
    _isHydrated: true;
}
