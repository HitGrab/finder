import { FinderPluginInterface, FinderTouchCallback } from "../../types";
import { Finder } from "../finder";

export abstract class FinderPlugin implements FinderPluginInterface {
    abstract id: string;

    instance: Finder<any> | undefined;

    touch: FinderTouchCallback | undefined;

    register(finder: Finder<any>, touch: FinderTouchCallback) {
        this.instance = finder;
        this.touch = touch;
    }
}
