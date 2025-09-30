import { FinderCore } from "./finder-core";
import { hasCharacterIndexMatches } from "./search/calculate-string-match-segments";
import { HydratedRuleEffect, HydratedSearchEffect, RuleEffect, SearchEffect } from "./types/effect-types";
import { FinderRule } from "./types/rule-types";
import { isRuleEffect, isSearchEffect } from "./utils/rule-utils";

export class EffectBook<FItem, FContext> {
    #ruleEffectDefinitions;
    #searchEffectDefinitions;

    searchEffects: HydratedSearchEffect[] = [];
    ruleEffects: HydratedRuleEffect[] = [];

    constructor(effects: (RuleEffect | SearchEffect)[], items: FItem[], context: FContext) {
        this.#ruleEffectDefinitions = effects.filter(isRuleEffect);
        this.#searchEffectDefinitions = effects.filter(isSearchEffect);
        this.hydrateDefinitions(items, context);
    }

    hydrateDefinitions(items: FItem[], context: FContext) {
        this.ruleEffects = this.#ruleEffectDefinitions.map((effect) => {
            const rules = typeof effect.rules === "function" ? effect.rules(items, context) : effect.rules;
            const rulesAsArray = Array.isArray(rules) ? rules : [rules];
            return { ...effect, rules: rulesAsArray, _isHydrated: true } as HydratedRuleEffect;
        });
        this.searchEffects = this.#searchEffectDefinitions.map((effect) => {
            const haystack = typeof effect.haystack === "function" ? effect.haystack(items, context) : effect.haystack;
            const haystackAsArray = Array.isArray(haystack) ? haystack : [haystack];
            return { ...effect, haystack: haystackAsArray, _isHydrated: true } as HydratedSearchEffect;
        });
    }

    processRule(rule: FinderRule, instance: FinderCore) {
        this.ruleEffects.forEach((effect) => {
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
                effect.onChange(instance);
            }
        });
    }

    processSearchTerm(searchTerm: string, instance: FinderCore) {
        this.searchEffects.forEach((effect) => {
            const isEffectTriggered = hasCharacterIndexMatches(effect.haystack, searchTerm);
            if (isEffectTriggered) {
                effect.onChange(instance);
            }
        });
    }
}
