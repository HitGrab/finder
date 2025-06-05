import { FinderMeta } from "../../types";
import { FINDER_EVENTS } from "../events/event-constants";
import { MixinInjectedDependencies } from "../types/core-types";

type InitialValues = {
    initialMeta: FinderMeta | undefined;
};
class MetaMixin<FItem> {
    meta;
    #deps;

    constructor({ initialMeta }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        this.meta = initialMeta;
        this.#deps = deps;
    }

    set(metaIdentifier: any, value: any) {
        const clonedMetaMap = new Map(this.meta);
        clonedMetaMap.set(metaIdentifier, value);
        this.meta = clonedMetaMap;
        this.#deps.eventEmitter.emit(FINDER_EVENTS.SET_META, { id: metaIdentifier, value });
        this.#deps.touch({ meta: clonedMetaMap });
    }
    get(metaIdentifier: any) {
        return this.meta?.get(metaIdentifier);
    }
    has(metaIdentifier: any) {
        return !!this.meta?.has(metaIdentifier);
    }
    delete(metaIdentifier: any) {
        const clonedMetaMap = new Map(this.meta);
        clonedMetaMap.delete(metaIdentifier);
        this.meta = clonedMetaMap;
        this.#deps.eventEmitter.emit(FINDER_EVENTS.SET_META, { id: metaIdentifier, value: undefined });
        this.#deps.touch({ meta: clonedMetaMap });
    }
    reset() {
        this.#deps.touch({ meta: undefined });
        this.meta = undefined;
    }
}

export { MetaMixin };
