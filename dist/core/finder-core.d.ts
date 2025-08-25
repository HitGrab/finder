import { MatchesSnapshot, FinderConstructorOptions, FinderEventName } from "../types";
import { EventCallback } from "./types/internal-types";
import { PluginMediator } from "./plugins/plugin-mediator";
declare class FinderCore<FItem, FContext = any> {
    #private;
    isReady: boolean;
    isLoading: boolean;
    disabled: boolean;
    updatedAt?: number;
    context: FContext;
    plugins: PluginMediator<FItem>;
    constructor(items: FItem[] | null | undefined, { rules, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialFilters, context, page, numItemsPerPage, isLoading, disabled, requireGroup, ignoreSortByRulesWhileSearchRuleIsActive, plugins, onInit, onReady, onFirstUserInteraction, onChange, }: FinderConstructorOptions<FItem, FContext>);
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
        toggle: (identifier: string | import("..").FilterRuleUnion | import("..").HydratedFilterRule) => void;
        toggleOption: (identifier: string | import("..").FilterRuleUnion | import("..").HydratedFilterRule, optionValue: import("..").FilterOption | any) => void;
        set: <FItem_1, FValue>(identifier: string | import("..").FilterRuleUnion<FItem_1, FValue> | import("..").HydratedFilterRule<FItem_1, FValue, any>, incomingFilterValue: FValue | FValue[]) => void;
        delete: (identifier: string | import("..").FilterRuleUnion | import("..").HydratedFilterRule) => void;
        test: (options: import("../types").FilterTestOptions) => any[];
        testRule: ({ rule: identifier, value, ...options }: import("../types").FilterTestRuleOptions) => any[];
        testRuleOptions: ({ rule: identifier, ...options }: import("../types").FilterTestRuleOptionsOptions) => Map<any, any>;
        filters: Record<string, any>;
        raw: Record<string, any>;
        activeRules: import("..").HydratedFilterRule<any, any, any>[];
        rules: import("..").HydratedFilterRule<any, any, any>[];
        isActive: (identifier: string | import("..").FilterRuleUnion | import("..").HydratedFilterRule) => boolean;
        get: (identifier: string | import("..").FilterRuleUnion | import("..").HydratedFilterRule) => any;
        has: (identifier: string | import("..").FilterRuleUnion | import("..").HydratedFilterRule, optionValue?: import("..").FilterOption | any) => any;
        getRule: <FItem_1 = any, FValue = any>(identifier: string | import("..").FilterRuleUnion<FItem_1, FValue> | import("..").HydratedFilterRule<FItem_1, FValue, any>) => import("..").HydratedFilterRule<FItem_1, FValue, any>;
    };
    get sortBy(): {
        set: (identifier?: string | import("..").SortByRule, incomingSortDirection?: import("..").SortDirection) => void;
        setSortDirection: (incomingSortDirection?: import("..").SortDirection) => void;
        cycleSortDirection: () => void;
        toggleSortDirection: () => void;
        reset(): void;
        activeRule: import("..").SortByRule<unknown, any> | undefined;
        sortDirection: import("..").SortDirection;
        userHasSetSortDirection: boolean;
        rules: import("..").SortByRule<unknown, any>[];
    };
    get groupBy(): {
        set: (identifier?: import("..").GroupByRule | string) => void;
        toggle: (identifier: import("..").GroupByRule | string) => void;
        setGroupIdSortDirection: (direction?: import("..").SortDirection) => void;
        reset: () => void;
        activeRule: import("..").GroupByRule<unknown, any> | undefined;
        requireGroup: boolean;
        rules: import("..").GroupByRule<unknown, any>[];
        groupIdSortDirection: import("..").SortDirection | undefined;
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
    get events(): {
        on: (event: FinderEventName, callback: EventCallback) => void;
        off: (event: FinderEventName, callback: EventCallback) => void;
    };
    get state(): "loading" | "empty" | "groups" | "items" | "noMatches";
    setItems(items: FItem[] | null | undefined): void;
    setIsLoading(value?: boolean): void;
    setIsDisabled(value?: boolean): void;
    setContext(context: FContext): void;
}
export { FinderCore };
