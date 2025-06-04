export type EventCallback = (payload?: any) => void;
type EventPayload = {
    event: string;
    payload: any;
};
type DiscriminatedPayload<P extends EventPayload, T extends string> = Extract<P, {
    event: `${T}`;
}>["payload"];
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
export {};
