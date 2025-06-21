import { FinderInitEvent, FinderFirstUserInteractionEvent, FinderPluginFn, FinderPluginInterface, FinderTouchCallback } from "../../types";
import { Finder } from "../finder";
import { FinderPlugin } from "./plugin-super-class";

export class PluginMediator<FItem> {
    #plugins: FinderPluginInterface[] = [];

    constructor(
        plugins: (FinderPluginFn<FinderPluginInterface> | FinderPluginInterface | FinderPlugin)[],
        getInstance: () => Finder<FItem>,
        touch: FinderTouchCallback,
    ) {
        // bind a referene to the container Finder instance to each plugin
        const instance = getInstance();

        this.#plugins = plugins.map((plugin) => {
            // instantiate plugin if it's a stable obj without configuration
            let initializedPlugin: FinderPluginInterface | undefined = undefined;

            if (typeof plugin === "object") {
                // either an object literal or an instantiated class
                initializedPlugin = plugin;
            } else if (typeof plugin === "function") {
                // a reference to an uninitialized plugin
                if (isPluginConstructor(plugin)) {
                    initializedPlugin = Reflect.construct(plugin, []);
                } else {
                    initializedPlugin = plugin();
                }
            }

            if (initializedPlugin === undefined) {
                throw new Error("Unrecognized plugin format received.");
            }

            initializedPlugin.register(instance, touch);
            return initializedPlugin;
        });
    }

    get<T extends FinderPluginInterface>(identifier: string | T) {
        let match: T | undefined;
        if (typeof identifier === "string") {
            match = this.#plugins.find((plugin) => plugin.id === identifier) as T | undefined;
        }
        if (typeof identifier === "object") {
            match = this.#plugins.find((plugin) => plugin.id === identifier.id) as T | undefined;
        }

        if (!match) {
            throw new Error("Finder was unable to locate requested plugin.");
        }

        return match;
    }

    has<T extends FinderPluginInterface>(identifier: string | T) {
        try {
            this.get(identifier);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Notify all plugins that Finder is alive
     */
    onInit(event: FinderInitEvent) {
        this.#plugins.forEach((plugin) => {
            if (plugin.onInit) {
                plugin.onInit(event);
            }
        });
    }

    onFirstUserInteraction(event: FinderFirstUserInteractionEvent) {
        this.#plugins.forEach((plugin) => {
            if (plugin.onFirstUserInteraction) {
                plugin.onFirstUserInteraction(event);
            }
        });
    }
}

function isPluginConstructor(fn: unknown): fn is InstanceType<typeof FinderPlugin> {
    if (typeof fn !== "function") {
        return false;
    }
    try {
        Reflect.construct(fn, []);
    } catch (e) {
        return false;
    }
    return true;
}
