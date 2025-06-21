import { MetaMixin } from "./meta";
/**
 * Public surface for the Meta mixin
 */
declare function readonlyMetaInterface<FItem>(mixin: MetaMixin<FItem>): {
    value: Record<string, any>;
    get: (metaIdentifier: any) => any;
    has: (metaIdentifier: any) => boolean;
};
declare function metaInterface<FItem>(mixin: MetaMixin<FItem>): {
    set: (metaIdentifier: any, value: any) => void;
    delete: (metaIdentifier: any) => void;
    reset: () => void;
    value: Record<string, any>;
    get: (metaIdentifier: any) => any;
    has: (metaIdentifier: any) => boolean;
};
export { readonlyMetaInterface, metaInterface };
