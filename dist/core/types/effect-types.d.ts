import { FinderCore } from "../finder-core";
import { RuleDefinition } from "./rule-types";
export interface RuleEffect<FItem = any, FContext = any> {
    rules: string | RuleDefinition<FItem> | (string | RuleDefinition<FItem>)[] | ((items: FItem[], context: FContext) => string | RuleDefinition<FItem> | (string | RuleDefinition<FItem>)[]);
    onChange: (instance: FinderCore<FItem, FContext>, rule: RuleDefinition<FItem>) => void;
}
export interface HydratedRuleEffect<FItem = any, FContext = any> {
    rules: (string | RuleDefinition<FItem>)[];
    onChange: (instance: FinderCore<FItem, FContext>, rule: RuleDefinition<FItem>) => void;
}
export interface SearchEffect<FItem = any, FContext = any> {
    haystack: string | string[] | ((items: FItem[], context: FContext) => string | string[]);
    onChange: (instance: FinderCore<FItem, FContext>, searchTerm: string) => void;
}
export interface HydratedSearchEffect<FItem = any, FContext = any> {
    haystack: string[];
    onChange: (instance: FinderCore<FItem, FContext>, searchTerm: string) => void;
}
