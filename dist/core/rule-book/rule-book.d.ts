import { FinderCore } from "../finder-core";
import { RuleEffect, SearchEffect } from "../types/effect-types";
import { RuleDefinition } from "../types/rule-types";
import { RuleEffectAppendix } from "./rule-effect-appendix";
import { RuleListAppendix } from "./rule-list-appendix";
import { SearchEffectAppendix } from "./search-effect-appendix";
interface RuleBookOptions {
    rules: RuleDefinition[];
    ruleEffects: RuleEffect[];
    searchEffects: SearchEffect[];
}
/**
 * Stores rule definitions and hydrated rules class objects
 */
export declare class RuleBook<FItem, FContext> {
    list: RuleListAppendix;
    ruleEffects: RuleEffectAppendix<FItem, FContext>;
    searchEffects: SearchEffectAppendix<FItem, FContext>;
    constructor({ rules, ruleEffects, searchEffects }: RuleBookOptions);
    hydrateDefinitions(items: FItem[], context: FContext): void;
    onChange(rule: RuleDefinition, instanceInterface: FinderCore): void;
}
export {};
