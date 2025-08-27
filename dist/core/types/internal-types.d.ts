/**
 * These internal types are not intended for public consumption.
 */
import { DebounceCallbackRegistry } from "../debounce-callback-registry/debounce-callback-registry";
import { RuleBook } from "../rule-book/rule-book";
import { FinderTouchCallback } from "./event-types";
export interface MixinInjectedDependencies<FItem = any, FContext = any> {
    isLoading: () => boolean;
    isDisabled: () => boolean;
    getRuleBook: () => RuleBook<FItem, FContext>;
    touch: FinderTouchCallback;
    getContext: () => any;
    getItems: () => FItem[];
    debouncer: DebounceCallbackRegistry;
}
export type EventCallback = (payload?: any) => void;
