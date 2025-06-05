import { FinderMeta } from "../../types";
import { MixinInjectedDependencies } from "../types/core-types";
type InitialValues = {
    initialMeta: FinderMeta | undefined;
};
declare class MetaMixin<FItem> {
    #private;
    meta: FinderMeta | undefined;
    constructor({ initialMeta }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    set(metaIdentifier: any, value: any): void;
    get(metaIdentifier: any): any;
    has(metaIdentifier: any): boolean;
    delete(metaIdentifier: any): void;
    reset(): void;
}
export { MetaMixin };
