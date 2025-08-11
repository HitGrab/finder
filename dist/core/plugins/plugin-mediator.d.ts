import { FinderInitEvent, FinderFirstUserInteractionEvent, FinderPluginFn, FinderPluginInterface, FinderTouchCallback } from "../../types";
import { FinderCore } from "../finder-core";
import { FinderPlugin } from "./plugin-super-class";
export declare class PluginMediator<FItem> {
    #private;
    constructor(plugins: (FinderPluginFn<FinderPluginInterface> | FinderPluginInterface | FinderPlugin)[], getInstance: () => FinderCore<FItem>, touch: FinderTouchCallback);
    get<T extends FinderPluginInterface>(identifier: string | T): T;
    has<T extends FinderPluginInterface>(identifier: string | T): boolean;
    /**
     * Notify all plugins that Finder is alive
     */
    onInit(event: FinderInitEvent): void;
    onFirstUserInteraction(event: FinderFirstUserInteractionEvent): void;
}
