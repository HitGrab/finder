import { FinderPluginInterface, FinderTouchCallback } from "../../types";
import { Finder } from "../finder";
export declare abstract class FinderPlugin implements FinderPluginInterface {
    abstract id: string;
    instance: Finder<any> | undefined;
    touch: FinderTouchCallback | undefined;
    register(finder: Finder<any>, touch: FinderTouchCallback): void;
}
