import { FinderRule } from "./types/rule-types";
/**
 * Stores rule definitions and hydrated rules
 */
export declare class RuleBook<FItem, FContext> {
    #private;
    rules: FinderRule<FItem>[];
    constructor(definitions: FinderRule<FItem>[], items: FItem[], context: FContext);
    hydrateDefinitions(items: FItem[], context: FContext): void;
    getRule(identifier: string | FinderRule): FinderRule<FItem>;
    getDefinitions(): FinderRule<FItem>[];
    setRules(definitions: FinderRule<FItem>[]): void;
    static validateDefinitions(definitions: FinderRule[]): boolean;
}
