import { FinderInitEvent, FinderFirstUserInteractionEvent, FinderPluginFn, FinderPluginInterface, FinderTouchCallback } from "../../types";
import { Finder } from "../finder";
import { FinderPlugin } from "./plugin-super-class";
export declare class PluginMediator<FItem> {
    #private;
    constructor(plugins: (FinderPluginFn<FinderPluginInterface> | FinderPluginInterface | FinderPlugin)[], getInstance: () => Finder<FItem>, touch: FinderTouchCallback);
    get<T extends FinderPluginInterface>(identifier: string | T): T;
    has<T extends FinderPluginInterface>(identifier: string | T): boolean;
    /**
     * Notify all plugins that Finder is alive
     */
    onInit(event: FinderInitEvent): void;
    onFirstUserInteraction(event: FinderFirstUserInteractionEvent): void;
}
