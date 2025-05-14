import { FinderConstructorOptions } from "../types";
import { Finder } from "./finder";
/**
 * Entrypoint for React.useSyncExternalStore
 */
declare class FinderSyncExternalStore<FItem> {
    #private;
    instance: Finder<FItem>;
    constructor(items: FItem[] | null | undefined, { onChange, ...props }: FinderConstructorOptions<FItem>);
    subscribe(listener: CallableFunction): () => void;
    emitChanges(): void;
    getSnapshot(): Finder<FItem>;
}
export { FinderSyncExternalStore };
