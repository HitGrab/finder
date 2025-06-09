import { EventCallback } from "../types/internal-types";

type ListenerObject = Record<string, EventCallback[]>;

/**
 * A barebones event emitter
 */
export class EventEmitter {
    #listeners: ListenerObject = {} as ListenerObject;
    #batchMode: boolean = false;
    // #batchBucket: { event: T; payload: DiscriminatedPayload<T> }[] = [];
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

        // if (this.#batchMode) {
        //     this.#batchBucket.push({ event, payload });
        //     return;
        // }

        this.#listeners[event]?.forEach((callback) => callback(payload));
    }

    // #setBatchMode(value: boolean) {
    //     this.#batchMode = value;
    // }

    // async batch(callback: CallableFunction) {
    //     this.#setBatchMode(true);
    //     await callback();
    //     this.#setBatchMode(false);

    //     if (this.#batchBucket.length > 0) {
    //         const eventNames = uniq(this.#batchBucket.map(({ event }) => event));
    //         eventNames.forEach((event) => {
    //             const matchingEventPayloads = this.#batchBucket.filter((row) => row.event === event).map(({ payload }) => payload);
    //             const payloadBuckets: Record<string, any[]> = {};
    //             matchingEventPayloads.forEach((row) => {
    //                 Object.keys(row).forEach((key) => {
    //                     payloadBuckets[key] = merge(payloadBuckets[key], row[key]);
    //                 });
    //             });

    //             this.emit(event, payloadBuckets);
    //         });
    //     }
    // }

    silently(callback: CallableFunction) {
        this.#disabled = true;
        callback();
        this.#disabled = false;
    }
}
