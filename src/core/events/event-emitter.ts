import { EventCallback } from "../types/core-types";

type ListenerObject = Record<string, EventCallback[]>;

/**
 * A barebones event emitter
 */
export class EventEmitter<EventNames extends string> {
    #listeners: ListenerObject = {} as ListenerObject;
    #disabled: boolean = false;

    on(event: EventNames, callback: EventCallback) {
        if (this.#listeners[event] === undefined) {
            this.#listeners[event] = [];
        }
        this.#listeners[event].push(callback);
    }

    off(event: EventNames, callback: EventCallback) {
        if (this.#listeners[event] === undefined) {
            return;
        }
        if (callback === undefined) {
            delete this.#listeners[event];
            return;
        }

        this.#listeners[event] = this.#listeners[event].filter((rowCallback) => {
            return rowCallback !== callback;
        });
    }

    emit(event: EventNames, payload?: any) {
        if (this.#disabled) {
            return;
        }
        this.#listeners[event]?.forEach((callback) => callback(payload));
    }

    silently(callback: CallableFunction) {
        this.#disabled = true;
        callback();
        this.#disabled = false;
    }

    isSilent() {
        return this.#disabled;
    }
}
