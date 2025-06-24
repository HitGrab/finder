import { LayoutMixin } from "./layout";
/**
 * Public surface for the Filters mixin
 */
declare function readonlyLayoutInterface(mixin: LayoutMixin): {
    variants: import("../..").LayoutVariant[];
    activeLayout: import("../..").LayoutVariant | undefined;
    raw: import("../..").LayoutVariant | undefined;
    is: (identifier: string | import("../..").LayoutVariant | undefined) => boolean;
};
declare function layoutInterface(mixin: LayoutMixin): {
    set: (identifier: string | import("../..").LayoutVariant | undefined) => void;
    reset: () => void;
    variants: import("../..").LayoutVariant[];
    activeLayout: import("../..").LayoutVariant | undefined;
    raw: import("../..").LayoutVariant | undefined;
    is: (identifier: string | import("../..").LayoutVariant | undefined) => boolean;
};
export { readonlyLayoutInterface, layoutInterface };
