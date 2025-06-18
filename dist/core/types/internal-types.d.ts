/**
 * These internal types are not intended for public consumption.
 */
import { FinderRule, FinderMeta, FinderTouchCallback } from "../../types";
import { DebounceCallbackRegistry } from "../debounce-callback-registry/debounce-callback-registry";
export interface EventPayload {
    event: string;
    payload: any;
}
export type DiscriminatedPayload<P extends EventPayload, T extends string> = Extract<P, {
    event: `${T}`;
}>["payload"];
export interface MixinInjectedDependencies<FItem> {
    isLoading: () => boolean;
    isDisabled: () => boolean;
    getRules: () => FinderRule[];
    touch: FinderTouchCallback;
    getMeta: () => FinderMeta | undefined;
    getItems: () => FItem[];
    debouncer: DebounceCallbackRegistry;
}
export type EventCallback = (payload?: any) => void;
