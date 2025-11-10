/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { FinderCore } from "../finder-core";
import { RuleEffect, SearchEffect } from "../types/effect-types";
import { RuleDefinition } from "../types/rule-types";
import { isSearchRuleDefinition } from "../utils/rule-utils";
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
export class RuleBook<FItem, FContext> {
    list: RuleListAppendix;
    ruleEffects: RuleEffectAppendix<FItem, FContext>;
    searchEffects: SearchEffectAppendix<FItem, FContext>;

    constructor({ rules, ruleEffects, searchEffects }: RuleBookOptions) {
        this.list = new RuleListAppendix(rules);
        this.ruleEffects = new RuleEffectAppendix(ruleEffects);
        this.searchEffects = new SearchEffectAppendix(searchEffects);
    }

    hydrateDefinitions(items: FItem[], context: FContext) {
        this.list.hydrateDefinitions(items, context);
        this.searchEffects.hydrateDefinitions(items, context);
        this.ruleEffects.hydrateDefinitions(items, context);
    }

    onChange(rule: RuleDefinition, instanceInterface: FinderCore) {
        if (isSearchRuleDefinition(rule) && instanceInterface.search.hasSearchTerm) {
            this.searchEffects.processSearchTerm(instanceInterface.search.searchTerm, instanceInterface);
        }
        this.ruleEffects.onChange(rule, instanceInterface);
    }
}
