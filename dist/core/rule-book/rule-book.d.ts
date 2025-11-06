import { HydratedRuleDefinition, RuleDefinition } from "../types/rule-types";
/**
 * Stores rule definitions and hydrated rules class objects
 */
export declare class RuleBook<FItem, FContext> {
    #private;
    rules: HydratedRuleDefinition[];
    constructor(definitions: RuleDefinition<FItem>[], items: FItem[], context: FContext);
    hydrateDefinitions(items: FItem[], context: FContext): void;
    getRule(identifier: string | RuleDefinition): HydratedRuleDefinition;
    getDefinitions(): RuleDefinition<FItem>[];
    setRules(definitions: RuleDefinition<FItem>[]): void;
    static validateDefinitions(definitions: RuleDefinition[]): boolean;
}
