import { FinderRuleDefinition } from "../types/rule-types";
/**
 * Stores rule definitions and hydrated rules class objects
 */
export declare class RuleBook<FItem, FContext> {
    #private;
    rules: FinderRuleDefinition[];
    constructor(definitions: FinderRuleDefinition<FItem>[], items: FItem[], context: FContext);
    hydrateDefinitions(items: FItem[], context: FContext): void;
    getRule(identifier: string | FinderRuleDefinition): FinderRuleDefinition;
    getDefinitions(): FinderRuleDefinition<FItem>[];
    setRules(definitions: FinderRuleDefinition<FItem>[]): void;
    static validateDefinitions(definitions: FinderRuleDefinition[]): boolean;
}
