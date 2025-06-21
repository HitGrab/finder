import { MixinInjectedDependencies } from "../types/internal-types";

type InitialValues = {
    initialMeta?: Record<string, any>;
};
class MetaMixin<FItem> {
    meta;
    #deps;

    constructor({ initialMeta }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        this.meta = initialMeta || {};
        this.#deps = deps;
    }

    set(metaIdentifier: any, value: any) {
        const previousValue = this.get(metaIdentifier);
        this.meta = { ...this.meta, [metaIdentifier]: value };
        this.#deps.touch({
            source: "meta",
            event: "change.meta.set",
            current: { key: metaIdentifier, value },
            initial: { key: metaIdentifier, value: previousValue },
        });
    }

    get(metaIdentifier: any) {
        return this.meta?.[metaIdentifier];
    }

    has(metaIdentifier: any) {
        return this.meta?.[metaIdentifier] !== undefined;
    }

    delete(metaIdentifier: any) {
        const previousValue = this.get(metaIdentifier);
        const clonedMeta = { ...this.meta };
        delete clonedMeta[metaIdentifier];
        this.meta = clonedMeta;

        this.#deps.touch({
            source: "meta",
            event: "change.meta.delete",
            current: { key: metaIdentifier, value: undefined },
            initial: { key: metaIdentifier, value: previousValue },
        });
    }
    reset() {
        const previousValue = this.meta;
        this.meta = {};
        this.#deps.touch({
            source: "meta",
            event: "change.meta.reset",
            current: { meta: this.meta },
            initial: { meta: previousValue },
        });
    }

    get value() {
        return this.meta;
    }
}

export { MetaMixin };
