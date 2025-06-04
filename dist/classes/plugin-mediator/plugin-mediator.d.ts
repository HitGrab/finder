import { FinderPluginFn, FinderPluginInterface } from "../../types";
import { Finder } from "../finder";
import { FinderPlugin } from "../plugin";
export declare class PluginMediator<FItem> {
    #private;
    constructor(plugins: (FinderPluginFn<FinderPluginInterface> | FinderPluginInterface | FinderPlugin)[], getInstance: () => Finder<FItem>);
    get<T extends FinderPluginInterface>(identifier: string | T): T;
    has<T extends FinderPluginInterface>(identifier: string | T): boolean;
}
