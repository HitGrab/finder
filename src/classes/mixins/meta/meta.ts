import { FinderMeta, FinderInjectedHandlers } from "../../../types";
import { FINDER_EVENTS } from "../../finder-events";

class MetaMixin<FItem> {
    meta?: FinderMeta;
    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialMeta: FinderMeta | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.meta = initialMeta;
        this.#handlers = handlers;
    }

    set(metaIdentifier: any, value: any) {
        const clonedMetaMap = new Map(this.meta);
        clonedMetaMap.set(metaIdentifier, value);
        this.meta = clonedMetaMap;
        this.#handlers.emit(FINDER_EVENTS.SET_META, { id: metaIdentifier, value });
        this.#handlers.emit(FINDER_EVENTS.CHANGE, { meta: clonedMetaMap });
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
        this.#handlers.emit(FINDER_EVENTS.SET_META, { id: metaIdentifier, undefined });
        this.#handlers.emit(FINDER_EVENTS.CHANGE, { meta: clonedMetaMap });
    }
    reset() {
        this.#handlers.emit(FINDER_EVENTS.CHANGE, { meta: undefined });
        this.meta = undefined;
    }
}

export { MetaMixin };
