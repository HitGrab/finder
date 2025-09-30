import { EventCallback } from "./types/core-types";

/**
 * A barebones event emitter
 */
export class EventEmitter<EventNames extends string> {
    #listeners = new Map<string, Set<EventCallback>>();
    #disabled = false;

    on(event: EventNames, callback: EventCallback) {
        if (this.#listeners.has(event) === false) {
            this.#listeners.set(event, new Set());
        }

        const eventSet = this.#listeners.get(event);
        eventSet?.add(callback);
    }

    off(event: EventNames, callback?: EventCallback) {
        if (this.#listeners.has(event) === false) {
            return;
        }
        if (callback === undefined) {
            this.#listeners.delete(event);
            return;
        }

        const eventSet = this.#listeners.get(event);
        eventSet?.delete(callback);
    }

    emit(event: EventNames, payload?: any) {
        if (this.#disabled) {
            return;
        }
        const eventSet = this.#listeners.get(event);
        eventSet?.forEach((callback) => {
            callback(payload);
        });
    }

    silently(callback: CallableFunction) {
        this.#disabled = true;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        callback();
        this.#disabled = false;
    }

    isSilent() {
        return this.#disabled;
    }
}
