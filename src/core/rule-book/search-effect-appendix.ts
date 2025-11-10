import { FinderCore } from "../finder-core";
import { hasCharacterIndexMatches } from "../search/calculate-string-match-segments";
import { HydratedSearchEffect, SearchEffect } from "../types/effect-types";

export class SearchEffectAppendix<FItem, FContext> {
    #definitions;

    effects: HydratedSearchEffect[] = [];

    constructor(definitions: SearchEffect[]) {
        this.#definitions = definitions;
    }

    hydrateDefinitions(items: FItem[], context: FContext) {
        this.effects = this.#definitions.map((effect) => {
            const haystack = typeof effect.haystack === "function" ? effect.haystack(items, context) : effect.haystack;
            const haystackAsArray = Array.isArray(haystack) ? haystack : [haystack];
            return { ...effect, haystack: haystackAsArray };
        });
    }

    setEffects(definitions: SearchEffect[]) {
        this.#definitions = definitions;
    }

    processSearchTerm(searchTerm: string, instance: FinderCore) {
        this.effects.forEach((effect) => {
            const isEffectTriggered = hasCharacterIndexMatches(effect.haystack, searchTerm);
            if (isEffectTriggered) {
                effect.onChange(instance, searchTerm);
            }
        });
    }
}
