import { FinderPluginInterface } from "../types";
import { Finder } from "./finder";

export abstract class FinderPlugin implements FinderPluginInterface {
    abstract id: string;

    instance: Finder<any> | undefined;

    register(finder: Finder<any>) {
        this.instance = finder;
    }
}
