import { MetaMixin } from "./meta";

/**
 * Public surface for the Meta mixin
 */
function readonlyMetaInterface<FItem>(mixin: MetaMixin<FItem>) {
    return { value: mixin.value, get: mixin.get.bind(mixin), has: mixin.has.bind(mixin) };
}

function metaInterface<FItem>(mixin: MetaMixin<FItem>) {
    return {
        ...readonlyMetaInterface(mixin),
        set: mixin.set.bind(mixin),
        delete: mixin.delete.bind(mixin),
        reset: mixin.reset.bind(mixin),
    };
}

export { readonlyMetaInterface, metaInterface };
