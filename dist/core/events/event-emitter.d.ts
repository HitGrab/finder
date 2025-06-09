import { EventCallback } from "../types/internal-types";
/**
 * A barebones event emitter
 */
export declare class EventEmitter {
    #private;
    on(event: string, callback: EventCallback): void;
    off(event: string, callback: EventCallback): void;
    emit(event: string, payload?: any): void;
    silently(callback: CallableFunction): void;
}
