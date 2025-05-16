import { FinderInjectedHandlers, FinderMeta } from "../../types";
declare class MetaMixin<FItem> {
    #private;
    meta?: FinderMeta;
    constructor(initialMeta: FinderMeta | undefined, handlers: FinderInjectedHandlers<FItem>);
    set(metaIdentifier: any, value: any): void;
    get(metaIdentifier: any): any;
    has(metaIdentifier: any): boolean;
    delete(metaIdentifier: any): void;
    reset(): void;
}
export { MetaMixin };
