import { FinderCore } from "../finder-core";
import { HydratedRuleEffect, RuleEffect } from "../types/effect-types";
import { RuleDefinition } from "../types/rule-types";

export class RuleEffectAppendix<FItem, FContext> {
    #definitions;

    effects: HydratedRuleEffect[] = [];

    constructor(definitions: RuleEffect[]) {
        this.#definitions = definitions;
    }

    hydrateDefinitions(items: FItem[], context: FContext) {
        this.effects = this.#definitions.map((effect) => {
            const rules = typeof effect.rules === "function" ? effect.rules(items, context) : effect.rules;
            const rulesAsArray = Array.isArray(rules) ? rules : [rules];
            return { ...effect, rules: rulesAsArray, _isHydrated: true } as HydratedRuleEffect;
        });
    }

    setEffects(definitions: RuleEffect[]) {
        this.#definitions = definitions;
    }

    onChange(rule: RuleDefinition, instance: FinderCore) {
        this.effects.forEach((effect) => {
            const isEffectTriggered = effect.rules.some((identifier) => {
                if (typeof identifier === "string" && rule.id === identifier) {
                    return true;
                }

                if (typeof identifier === "object" && rule.id === identifier.id) {
                    return true;
                }

                return false;
            });

            if (isEffectTriggered) {
                effect.onChange(instance, rule);
            }
        });
    }
}
