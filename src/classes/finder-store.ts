import { FinderOnChangeCallback, FinderConstructorOptions } from "../types";
import { Finder } from "./finder";

/**
 * Entrypoint for React.useSyncExternalStore
 */
class FinderSyncExternalStore<FItem> {
    #listeners: CallableFunction[] = [];

    instance: Finder<FItem>;

    constructor(items: FItem[] | null | undefined, { onChange, ...props }: FinderConstructorOptions<FItem>) {
        const wrappedOnChange: FinderOnChangeCallback = (diff, ref) => {
            this.emitChanges();
            onChange && onChange(diff, ref);
        };
        this.instance = new Finder(items, { onChange: wrappedOnChange, ...props });
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
        return this.instance.updatedAt;
    }
}

export { FinderSyncExternalStore };
