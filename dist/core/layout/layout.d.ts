import { LayoutVariant } from "../../types";
import { MixinInjectedDependencies } from "../types/internal-types";
type InitialValues = {
    layoutVariants: LayoutVariant[] | undefined;
    initialLayout: string | undefined;
};
/**
 * A layout could be a masonry gallery, a table list, or anything you like.
 * Finder's React components will attach this mixin to the renderProps method.
 */
declare class LayoutMixin {
    #private;
    variants: LayoutVariant[];
    constructor({ layoutVariants, initialLayout }: InitialValues, mixinDeps: MixinInjectedDependencies);
    set(identifier: string | LayoutVariant | undefined): void;
    is(identifier: string | LayoutVariant | undefined): boolean;
    reset(): void;
    get activeLayout(): LayoutVariant | undefined;
    get raw(): LayoutVariant | undefined;
}
export { LayoutMixin };
