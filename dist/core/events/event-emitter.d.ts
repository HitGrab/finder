import { EventPayload, DiscriminatedPayload, EventCallback } from "../types/core-types";
/**
 * A barebones event emitter
 */
export declare class EventEmitter<T extends string, P extends EventPayload> {
    #private;
    on(event: T, callback: EventCallback): void;
    off(event: T, callback: EventCallback): void;
    emit(event: T, payload?: DiscriminatedPayload<P, T>): void;
    batch(callback: CallableFunction): Promise<void>;
}
