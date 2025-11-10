import { FinderCore } from "../finder-core";
import { HydratedRuleEffect, RuleEffect } from "../types/effect-types";
import { RuleDefinition } from "../types/rule-types";
export declare class RuleEffectAppendix<FItem, FContext> {
    #private;
    effects: HydratedRuleEffect[];
    constructor(definitions: RuleEffect[]);
    hydrateDefinitions(items: FItem[], context: FContext): void;
    setEffects(definitions: RuleEffect[]): void;
    onChange(rule: RuleDefinition, instance: FinderCore): void;
}
