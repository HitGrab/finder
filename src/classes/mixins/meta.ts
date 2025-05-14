import { FinderInjectedHandlers, FinderMeta } from "../../types";

class MetaMixin<FItem> {
    meta?: FinderMeta;
    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialMeta: FinderMeta | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.meta = initialMeta;
        this.#handlers = handlers;
    }

    set(metaIdentifier: any, value: any) {
        this.#handlers.onInit();
        const clonedMetaMap = new Map(this.meta);
        clonedMetaMap.set(metaIdentifier, value);
        this.meta = clonedMetaMap;
        this.#handlers.onChange({ meta: clonedMetaMap });
    }
    get(metaIdentifier: any) {
        return this.meta?.get(metaIdentifier);
    }
    delete(metaIdentifier: any) {
        this.#handlers.onInit();
        const clonedMetaMap = new Map(this.meta);
        clonedMetaMap.delete(metaIdentifier);
        this.meta = clonedMetaMap;
        this.#handlers.onChange({ meta: clonedMetaMap });
    }
    reset() {
        this.#handlers.onInit();
        this.meta = undefined;
    }
}

export { MetaMixin };
