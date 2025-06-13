import { EventCallback } from "../types/internal-types";
/**
 * A barebones event emitter
 */
export declare class EventEmitter<EventNames extends string> {
    #private;
    on(event: EventNames, callback: EventCallback): void;
    off(event: EventNames, callback: EventCallback): void;
    emit(event: EventNames, payload?: any): void;
    silently(callback: CallableFunction): void;
}
