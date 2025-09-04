import { HydratedRuleEffect, HydratedSearchEffect, RuleEffect, SearchEffect } from "../types/effect-types";
export declare class EffectBook<FItem, FContext> {
    #private;
    searchEffects: HydratedSearchEffect[];
    ruleEffects: HydratedRuleEffect[];
    constructor(effects: (RuleEffect | SearchEffect)[], items: FItem[], context: FContext);
    hydrateDefinitions<FItem, FContext>(items: FItem[], context: FContext): void;
}
