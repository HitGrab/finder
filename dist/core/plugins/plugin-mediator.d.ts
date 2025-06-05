import { FinderDiff, FinderPluginFn, FinderPluginInterface } from "../../types";
import { Finder } from "../finder";
import { FinderPlugin } from "./plugin-super-class";
export declare class PluginMediator<FItem> {
    #private;
    constructor(plugins: (FinderPluginFn<FinderPluginInterface> | FinderPluginInterface | FinderPlugin)[], getInstance: () => Finder<FItem>, touch: (diff: FinderDiff) => void);
    get<T extends FinderPluginInterface>(identifier: string | T): T;
    has<T extends FinderPluginInterface>(identifier: string | T): boolean;
}
