import { FinderCore } from "../finder-core";
import { RuleDefinition, RuleEffect } from "../types/rule-types";
import { RuleEffectAppendix } from "./rule-effect-appendix";
import { RuleListAppendix } from "./rule-list-appendix";

interface RuleBookOptions {
    rules: RuleDefinition[];
    effects?: RuleEffect[];
}
/**
 * Stores rule definitions and hydrated rules class objects
 */
export class RuleBook<FItem, FContext> {
    list: RuleListAppendix;
    effects: RuleEffectAppendix<FItem, FContext>;

    constructor({ rules, effects }: RuleBookOptions) {
        this.list = new RuleListAppendix(rules);
        this.effects = new RuleEffectAppendix(effects);
    }

    hydrateDefinitions(items: FItem[], context: FContext) {
        this.list.hydrateDefinitions(items, context);
        this.effects.hydrateDefinitions(items, context);
    }

    onChange(rule: RuleDefinition, instanceInterface: FinderCore) {
        this.effects.onChange(rule, instanceInterface);
    }
}
