import { RuleDefinition } from "../types/rule-types";
export declare class RuleListAppendix {
    definitions: RuleDefinition[];
    rules: RuleDefinition[];
    constructor(definitions: RuleDefinition[]);
    hydrateDefinitions<FItem, FContext>(items: FItem[], context: FContext): void;
    getRule(identifier: string | RuleDefinition): RuleDefinition;
    setRules(definitions: RuleDefinition[]): void;
    static validateDefinitions(definitions: RuleDefinition[]): boolean;
}
