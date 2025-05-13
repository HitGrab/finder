import { FinderInjectedHandlers, FinderMeta as FinderMetaType } from "../types";

class FinderMeta<FItem> {
    #meta?: FinderMetaType;
    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialMeta: FinderMetaType | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.#meta = initialMeta;
        this.#handlers = handlers;
    }

    get value() {
        return this.#meta;
    }

    set(metaIdentifier: any, value: any) {
        this.#handlers.onInit();
        const clonedMetaMap = new Map(this.#meta);
        clonedMetaMap.set(metaIdentifier, value);
        this.#meta = clonedMetaMap;
        this.#handlers.onChange({ meta: clonedMetaMap });
    }
    get(metaIdentifier: any) {
        return this.#meta?.get(metaIdentifier);
    }
    delete(metaIdentifier: any) {
        this.#handlers.onInit();
        const clonedMetaMap = new Map(this.#meta);
        clonedMetaMap.delete(metaIdentifier);
        this.#meta = clonedMetaMap;
        this.#handlers.onChange({ meta: clonedMetaMap });
    }
    reset() {
        this.#handlers.onInit();
        this.#meta = undefined;
    }
}

export { FinderMeta };
