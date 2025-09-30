import { FinderCore } from "../finder-core";
import { FinderRule } from "./rule-types";
export interface RuleEffect<FItem = any, FContext = any> {
    rules: string | FinderRule<FItem> | (string | FinderRule<FItem>)[] | ((items: FItem[], context: FContext) => string | FinderRule<FItem> | (string | FinderRule<FItem>)[]);
    onChange: (instance: FinderCore<FItem, FContext>) => void;
}
export interface HydratedRuleEffect<FItem = any, FContext = any> {
    rules: (string | FinderRule<FItem>)[];
    onChange: (instance: FinderCore<FItem, FContext>) => void;
    _isHydrated: true;
}
export interface SearchEffect<FItem = any, FContext = any> {
    haystack: string | string[] | ((items: FItem[], context: FContext) => string | string[]);
    onChange: (instance: FinderCore<FItem, FContext>) => void;
}
export interface HydratedSearchEffect<FItem = any, FContext = any> {
    haystack: string[];
    onChange: (instance: FinderCore<FItem, FContext>) => void;
    _isHydrated: true;
}
