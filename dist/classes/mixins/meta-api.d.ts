import { MetaMixin } from "./meta";
/**
 * Public surface for the Meta mixin
 */
declare function metaAPI<FItem>(mixin: MetaMixin<FItem>): {
    value: import("../../types").FinderMeta | undefined;
    set: (metaIdentifier: any, value: any) => void;
    get: (metaIdentifier: any) => any;
    delete: (metaIdentifier: any) => void;
    reset: () => void;
};
export { metaAPI };
