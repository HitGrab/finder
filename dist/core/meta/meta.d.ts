import { FinderMeta } from "../../types";
import { MixinInjectedDependencies } from "../types/internal-types";
type InitialValues = {
    initialMeta?: FinderMeta;
};
declare class MetaMixin<FItem> {
    #private;
    meta: FinderMeta;
    constructor({ initialMeta }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    set(metaIdentifier: any, value: any): void;
    get(metaIdentifier: any): any;
    has(metaIdentifier: any): boolean;
    delete(metaIdentifier: any): void;
    reset(): void;
    get value(): FinderMeta;
}
export { MetaMixin };
