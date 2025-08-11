import { FinderPluginInterface, FinderTouchCallback } from "../../types";
import { FinderCore } from "../finder-core";

export abstract class FinderPlugin implements FinderPluginInterface {
    abstract id: string;

    instance: FinderCore<any> | undefined;

    touch: FinderTouchCallback | undefined;

    register(finder: FinderCore<any>, touch: FinderTouchCallback) {
        this.instance = finder;
        this.touch = touch;
    }
}
