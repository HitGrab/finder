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
class LayoutMixin {
    variants;

    #activeLayout;

    #deps;

    constructor({ layoutVariants = [], initialLayout }: InitialValues, mixinDeps: MixinInjectedDependencies) {
        if (initialLayout) {
            this.#activeLayout = layoutVariants.find(({ id }) => id === initialLayout);
        }

        this.variants = layoutVariants;
        this.#deps = mixinDeps;
    }

    set(identifier: string | LayoutVariant | undefined) {
        const previousValue = this.#activeLayout;
        if (typeof identifier === "string") {
            this.#activeLayout = this.variants.find(({ id }) => id === identifier);
        } else {
            this.#activeLayout = identifier;
        }

        this.#deps.touch({
            source: "layout",
            event: "change.layout.set",
            current: this.#activeLayout,
            initial: previousValue,
        });
    }

    is(identifier: string | LayoutVariant | undefined) {
        if (typeof identifier === "string") {
            return this.#activeLayout?.id === identifier;
        }
        return this.activeLayout === identifier;
    }

    reset() {
        const previousValue = this.#activeLayout;
        this.#activeLayout = undefined;

        this.#deps.touch({
            source: "layout",
            event: "change.layout.reset",
            current: this.#activeLayout,
            initial: previousValue,
        });
    }

    // if no display mode is active, select the first available option
    get activeLayout() {
        return this.#activeLayout ?? this.variants.at(0);
    }

    get raw() {
        return this.#activeLayout;
    }
}

export { LayoutMixin };
