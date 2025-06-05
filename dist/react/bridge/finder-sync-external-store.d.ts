import { Finder as FinderCore } from "../../core/finder";
import { FinderConstructorOptions } from "../../types";
/**
 * Entrypoint for React.useSyncExternalStore
 */
declare class FinderSyncExternalStore<FItem> {
    #private;
    instance: FinderCore<FItem>;
    constructor(items: FItem[] | null | undefined, { onChange, ...props }: FinderConstructorOptions<FItem>);
    subscribe(listener: CallableFunction): () => void;
    emitChanges(): void;
    getSnapshot(): number | undefined;
}
export { FinderSyncExternalStore };
