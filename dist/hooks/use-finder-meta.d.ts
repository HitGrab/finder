import { FinderMeta, FinderStateSnapshot } from "../types";
interface useFinderMetaOptions {
    initialValue?: FinderMeta;
    onInit?: () => void;
    onChange: (diff: FinderStateSnapshot) => void;
}
declare function useFinderMeta(options: useFinderMetaOptions): {
    state: FinderMeta | undefined;
    set: (metaIdentifier: any, value: any) => void;
    get: (metaIdentifier: any) => any;
    delete: (metaIdentifier: any) => void;
    reset: () => void;
};
export { useFinderMeta };
