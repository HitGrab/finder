import { FinderCore } from "../finder-core";
import { FinderRule } from "./rule-types";

export interface RuleEffect<FItem = any, FContext = any> {
    rules: string | FinderRule<FItem> | (string | FinderRule<FItem>)[];
    onChange: (instance: FinderCore<FItem, FContext>) => void;
}

export interface SearchEffect<FItem = any, FContext = any> {
    haystack: string | string[];
    onChange: (instance: FinderCore<FItem, FContext>) => void;
    exact?: boolean;
}
