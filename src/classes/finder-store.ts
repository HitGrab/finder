import { FinderCore, FinderOnChangeCallback, FinderSnapshot, MatchesSnapshot, useFinderFactoryOptions } from "../types";
import { Finder } from "./Finder";

/**
 * Entrypoint for React.useSyncExternalStore
 */
class FinderSyncExternalStore<FItem> {
    #listeners: CallableFunction[] = [];

    instance: Finder<FItem>;

    #snapshot?: MatchesSnapshot<FItem>;

    constructor(items: FItem[] | null | undefined, { onChange, ...props }: useFinderFactoryOptions<FItem>) {
        const wrappedOnChange: FinderOnChangeCallback = (diff, ref) => {
            this.#snapshot = this.instance.findMatches();
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
        return this.instance.findMatches();
    }
}

export { FinderSyncExternalStore };
