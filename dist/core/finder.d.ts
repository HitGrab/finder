import { MatchesSnapshot, FinderConstructorOptions, FinderEventName } from "../types";
import { PluginMediator } from "./plugins/plugin-mediator";
import { EventCallback } from "./types/internal-types";
declare class Finder<FItem> {
    #private;
    isReady: boolean;
    isLoading: boolean;
    disabled: boolean;
    updatedAt?: number;
    plugins: PluginMediator<FItem>;
    constructor(items: FItem[] | null | undefined, { rules, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialFilters, initialSelectedItems, initialMeta, page, numItemsPerPage, isLoading, disabled, requireGroup, maxSelectedItems, plugins, onInit, onReady, onFirstUserInteraction, onChange, }: FinderConstructorOptions<FItem>);
    emitFirstUserInteraction(): void;
    get items(): FItem[];
    get matches(): MatchesSnapshot<FItem>;
    get isEmpty(): boolean;
    get search(): {
        setSearchTerm: (incomingSearchTerm: string) => void;
        reset: () => void;
        searchTerm: string;
        activeRule: import("..").SearchRule<unknown> | undefined;
        hasSearchTerm: boolean;
    };
    get filters(): {
        toggle: (identifier: string | import("..").FilterRule | import("..").HydratedFilterRule) => void;
        toggleOption: (identifier: string | import("..").FilterRule | import("..").HydratedFilterRule, optionValue: import("..").FilterOption | any) => void;
        set: (identifier: import("..").FilterRule | import("..").HydratedFilterRule | string, incomingFilterValue: any) => void;
        delete: (identifier: string | import("..").FilterRule | import("..").HydratedFilterRule) => void;
        test: (options: import("../types").FilterTestOptions) => FItem[];
        testRule: ({ rule: identifier, value, ...options }: import("../types").FilterTestRuleOptions) => FItem[];
        testRuleOptions: ({ rule: identifier, ...options }: import("../types").FilterTestRuleOptionsOptions) => Map<any, any>;
        filters: Record<string, any>;
        raw: Record<string, any>;
        activeRules: import("..").HydratedFilterRule<FItem>[];
        rules: import("..").HydratedFilterRule<FItem>[];
        isActive: (identifier: string | import("..").FilterRule | import("..").HydratedFilterRule) => boolean;
        get: (identifier: string | import("..").FilterRule | import("..").HydratedFilterRule) => any;
        has: (identifier: string | import("..").FilterRule | import("..").HydratedFilterRule, optionValue?: import("..").FilterOption | any) => any;
        getRule: (id: string) => import("..").HydratedFilterRule<FItem> | undefined;
    };
    get sortBy(): {
        set: (identifier?: string | import("..").SortByRule, incomingSortDirection?: import("..").SortDirection) => void;
        setSortDirection: (incomingSortDirection?: import("..").SortDirection) => void;
        cycleSortDirection: () => void;
        toggleSortDirection: () => void;
        reset(): void;
        activeRule: import("..").SortByRule<unknown> | undefined;
        sortDirection: import("..").SortDirection;
        userHasSetSortDirection: boolean;
        rules: import("..").SortByRule<unknown>[];
    };
    get groupBy(): {
        set: (identifier?: import("..").GroupByRule | string) => void;
        toggle: (identifier: import("..").GroupByRule | string) => void;
        setGroupIdSortDirection: (direction?: import("..").SortDirection) => void;
        reset: () => void;
        activeRule: import("..").GroupByRule<unknown> | undefined;
        requireGroup: boolean;
        rules: import("..").GroupByRule<unknown>[];
        groupIdSortDirection: import("..").SortDirection | undefined;
    };
    get meta(): {
        set: (metaIdentifier: any, value: any) => void;
        delete: (metaIdentifier: any) => void;
        reset: () => void;
        value: Record<string, any>;
        get: (metaIdentifier: any) => any;
        has: (metaIdentifier: any) => boolean;
    };
    get pagination(): {
        setPage: (value: number) => void;
        setNumItemsPerPage: (value?: number) => void;
        page: number;
        offset: number;
        numItemsPerPage: number | undefined;
        numTotalItems: number;
        lastPage: number | undefined;
        isPaginated: boolean;
    };
    get selectedItems(): {
        setMaxSelectedItems: (value?: number) => void;
        select: (item: FItem) => void;
        selectOnly: (item: FItem) => void;
        delete: (item: FItem) => void;
        toggle: (item: FItem) => void;
        toggleOnly: (item: FItem) => void;
        reset: () => void;
        items: FItem[];
        maxSelectedItems: number | undefined;
        isSelected: (item: FItem) => boolean;
    };
    get events(): {
        on: (event: FinderEventName, callback: EventCallback) => void;
        off: (event: FinderEventName, callback: EventCallback) => void;
    };
    get state(): "loading" | "empty" | "groups" | "items" | "noMatches";
    setItems(items: FItem[] | null | undefined): void;
    setIsLoading(value?: boolean): void;
    setIsDisabled(value?: boolean): void;
}
export { Finder };
