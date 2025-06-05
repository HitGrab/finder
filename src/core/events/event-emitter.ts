import { merge, uniq } from "lodash";
import { EventPayload, DiscriminatedPayload, EventCallback } from "../types/core-types";

type ListenerObject<T extends string> = Record<T, EventCallback[]>;

/**
 * A barebones event emitter
 */
export class EventEmitter<T extends string, P extends EventPayload> {
    #listeners: ListenerObject<T> = {} as ListenerObject<T>;
    #batchMode: boolean = false;
    #batchBucket: { event: T; payload: DiscriminatedPayload<P, T> }[] = [];

    on(event: T, callback: EventCallback) {
        if (this.#listeners[event] === undefined) {
            this.#listeners[event] = [];
        }
        this.#listeners[event].push(callback);
    }

    off(event: T, callback: EventCallback) {
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

    emit(event: T, payload?: DiscriminatedPayload<P, T>) {
        if (this.#batchMode) {
            this.#batchBucket.push({ event, payload });
            return;
        }

        this.#listeners[event]?.forEach((callback) => callback(payload));
    }

    #setBatchMode(value: boolean) {
        this.#batchMode = value;
    }

    async batch(callback: CallableFunction) {
        this.#setBatchMode(true);
        await callback();
        this.#setBatchMode(false);

        if (this.#batchBucket.length > 0) {
            const eventNames = uniq(this.#batchBucket.map(({ event }) => event));
            eventNames.forEach((event) => {
                const matchingEventPayloads = this.#batchBucket.filter((row) => row.event === event).map(({ payload }) => payload);
                const payloadBuckets: Record<string, any[]> = {};
                matchingEventPayloads.forEach((row) => {
                    Object.keys(row).forEach((key) => {
                        payloadBuckets[key] = merge(payloadBuckets[key], row[key]);
                    });
                });

                this.emit(event, payloadBuckets);
            });
        }
    }
}
