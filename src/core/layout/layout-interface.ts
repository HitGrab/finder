import { LayoutMixin } from "./layout";

/**
 * Public surface for the Filters mixin
 */
function readonlyLayoutInterface(mixin: LayoutMixin) {
    return {
        variants: mixin.variants,
        activeLayout: mixin.activeLayout,
        raw: mixin.raw,
        is: mixin.is.bind(mixin),
    };
}

function layoutInterface(mixin: LayoutMixin) {
    return {
        ...readonlyLayoutInterface(mixin),
        set: mixin.set.bind(mixin),
        reset: mixin.reset.bind(mixin),
    };
}

export { readonlyLayoutInterface, layoutInterface };
