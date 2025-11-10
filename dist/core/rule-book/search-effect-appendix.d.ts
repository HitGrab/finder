import { FinderCore } from "../finder-core";
import { HydratedSearchEffect, SearchEffect } from "../types/effect-types";
export declare class SearchEffectAppendix<FItem, FContext> {
    #private;
    effects: HydratedSearchEffect[];
    constructor(definitions: SearchEffect[]);
    hydrateDefinitions(items: FItem[], context: FContext): void;
    setEffects(definitions: SearchEffect[]): void;
    processSearchTerm(searchTerm: string, instance: FinderCore): void;
}
