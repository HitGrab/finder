/**
 * These internal types are not intended for public consumption.
 */
import { FinderRule, FinderTouchCallback, MetaInterface } from "../../types";
import { DebounceCallbackRegistry } from "../debounce-callback-registry/debounce-callback-registry";
export interface EventPayload {
    event: string;
    payload: any;
}
export type DiscriminatedPayload<P extends EventPayload, T extends string> = Extract<P, {
    event: `${T}`;
}>["payload"];
export interface MixinInjectedDependencies<FItem = any> {
    isLoading: () => boolean;
    isDisabled: () => boolean;
    getRules: () => FinderRule[];
    touch: FinderTouchCallback;
    getMeta: () => MetaInterface;
    getItems: () => FItem[];
    debouncer: DebounceCallbackRegistry;
}
export type EventCallback = (payload?: any) => void;
