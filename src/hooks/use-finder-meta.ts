import { useState } from "react";
import { FinderMeta, FinderStateSnapshot } from "../types";

interface useFinderMetaOptions {
    initialValue?: FinderMeta;
    onInit?: () => void;
    onChange: (diff: FinderStateSnapshot) => void;
}
function useFinderMeta(options: useFinderMetaOptions) {
    const [meta, setMeta] = useState(options.initialValue);
    return {
        state: meta,
        set: (metaIdentifier: any, value: any) => {
            setMeta((prevMetaState) => {
                options.onInit && options.onInit();
                const clonedMetaMap = new Map(prevMetaState);
                clonedMetaMap.set(metaIdentifier, value);
                options.onChange({ meta: clonedMetaMap });
                return clonedMetaMap;
            });
        },
        get: (metaIdentifier: any) => {
            return meta?.get(metaIdentifier);
        },
        delete: (metaIdentifier: any) => {
            setMeta((prevMetaState) => {
                options.onInit && options.onInit();
                const clonedMetaMap = new Map(prevMetaState);
                clonedMetaMap.delete(metaIdentifier);
                options.onChange({ meta: clonedMetaMap });
                return clonedMetaMap;
            });
        },
        reset: () => {
            options.onInit && options.onInit();
            setMeta(new Map());
        },
    };
}

export { useFinderMeta };
