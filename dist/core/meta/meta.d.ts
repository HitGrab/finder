import { MixinInjectedDependencies } from "../types/internal-types";
type InitialValues = {
    initialMeta?: Record<string, any>;
};
declare class MetaMixin<FItem> {
    #private;
    meta: Record<string, any>;
    constructor({ initialMeta }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    set(metaIdentifier: any, value: any): void;
    get(metaIdentifier: any): any;
    has(metaIdentifier: any): boolean;
    delete(metaIdentifier: any): void;
    reset(): void;
    get value(): Record<string, any>;
}
export { MetaMixin };
