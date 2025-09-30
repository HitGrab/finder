import { FinderCore } from "./finder-core";
import { HydratedRuleEffect, HydratedSearchEffect, RuleEffect, SearchEffect } from "./types/effect-types";
import { FinderRule } from "./types/rule-types";
export declare class EffectBook<FItem, FContext> {
    #private;
    searchEffects: HydratedSearchEffect[];
    ruleEffects: HydratedRuleEffect[];
    constructor(effects: (RuleEffect | SearchEffect)[], items: FItem[], context: FContext);
    hydrateDefinitions(items: FItem[], context: FContext): void;
    processRule(rule: FinderRule, instance: FinderCore): void;
    processSearchTerm(searchTerm: string, instance: FinderCore): void;
}
