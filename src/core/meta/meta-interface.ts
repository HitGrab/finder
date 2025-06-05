import { MetaMixin } from "./meta";

/**
 * Public surface for the Meta mixin
 */
function metaInterface<FItem>(mixin: MetaMixin<FItem>) {
    return {
        value: mixin.meta,
        set: mixin.set.bind(mixin),
        get: mixin.get.bind(mixin),
        has: mixin.has.bind(mixin),
        delete: mixin.delete.bind(mixin),
        reset: mixin.reset.bind(mixin),
    };
}

export { metaInterface };
