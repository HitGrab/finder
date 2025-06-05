import { Finder as FinderCore } from "../../core/finder";
import { FinderConstructorOptions, FinderOnChangeCallback } from "../../types";

/**
 * Entrypoint for React.useSyncExternalStore
 */
class FinderSyncExternalStore<FItem> {
    #listeners: CallableFunction[] = [];

    instance: FinderCore<FItem>;
    #updatedAt: number | undefined;

    constructor(items: FItem[] | null | undefined, { onChange, ...props }: FinderConstructorOptions<FItem>) {
        const wrappedOnChange: FinderOnChangeCallback = (diff, snapshot) => {
            this.#updatedAt = snapshot.updatedAt;
            this.emitChanges();
            onChange && onChange(diff, snapshot);
        };
        this.instance = new FinderCore(items, { onChange: wrappedOnChange, ...props });
    }

    subscribe(listener: CallableFunction) {
        this.#listeners = [...this.#listeners, listener];
        return () => {
            this.#listeners = this.#listeners.filter((l) => l !== listener);
        };
    }

    emitChanges() {
        for (let listener of this.#listeners) {
            listener();
        }
    }

    getSnapshot() {
        return this.#updatedAt;
    }
}

export { FinderSyncExternalStore };
