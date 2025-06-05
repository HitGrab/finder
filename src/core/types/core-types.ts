/**
 * These internal types are not intended for public consumption.
 */

import { FinderDiff, FinderSnapshot, SearchRule, HydratedFilterRule, SortByRule, GroupByRule, FinderRule, FinderMeta } from "../../types";
import { EventEmitter } from "../events/event-emitter";
import { DebounceCallbackRegistry } from "../utils/debounce-callback-registry";

export interface EventPayload {
    event: string;
    payload: any;
}
export type DiscriminatedPayload<P extends EventPayload, T extends string> = Extract<P, { event: `${T}` }>["payload"];

export interface MixinInjectedDependencies<FItem> {
    isDisabled: () => boolean;
    getRules: () => FinderRule[];
    touch: (diff: FinderDiff) => void;
    getMeta: () => FinderMeta | undefined;
    getItems: () => FItem[];
    eventEmitter: FinderEventEmitter<FItem>;
    debouncer: DebounceCallbackRegistry;
}

export type EventCallback = (payload?: any) => void;

export type FinderEventEmitter<FItem> = EventEmitter<FinderEventNames, EventPayloads<FItem>>;

export type FinderEventNames = "init" | "change" | "setSearchTerm" | "setFilter" | "setSortBy" | "setGroupBy" | "toggleSelectedItem" | "setMeta";

export type EventPayloads<FItem> =
    | { event: "init"; payload: undefined }
    | { event: "change"; payload: { diff: FinderDiff; snapshot: FinderSnapshot<FItem> } }
    | { event: "setSearchTerm"; payload: { rule: SearchRule; searchTerm: string } }
    | { event: "setFilter"; payload: { rule: HydratedFilterRule; value: any } }
    | { event: "setGroupBy"; payload: { rule?: GroupByRule; groupIdSortDirection?: string } }
    | { event: "setSortBy"; payload: { rule?: SortByRule; sortDirection?: string } }
    | { event: "toggleSelectedItem"; payload: { item: FItem; isSelected: boolean } }
    | { event: "setMeta"; payload: { id: any; value: any } };
