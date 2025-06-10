import { EventCallback } from "../types/internal-types";

type ListenerObject = Record<string, EventCallback[]>;

/**
 * A barebones event emitter
 */
export class EventEmitter {
    #listeners: ListenerObject = {} as ListenerObject;
    #disabled: boolean = false;

    on(event: string, callback: EventCallback) {
        if (this.#listeners[event] === undefined) {
            this.#listeners[event] = [];
        }
        this.#listeners[event].push(callback);
    }

    off(event: string, callback: EventCallback) {
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

    emit(event: string, payload?: any) {
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
}
