import { MetaMixin } from "./meta";

/**
 * Public surface for the Meta mixin
 */
function metaAPI<FItem>(mixin: MetaMixin<FItem>) {
    return {
        value: mixin.meta,
        set: mixin.set.bind(mixin),
        get: mixin.get.bind(mixin),
        delete: mixin.delete.bind(mixin),
        reset: mixin.reset.bind(mixin),
    };
}

export { metaAPI };
