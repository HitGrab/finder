import { FinderConstructorOptions, SnapshotSerializedMixins } from "./types/core-types";
import { FinderRuleDefinition } from "./types/rule-types";
/**
 * This thin wrapper around FinderCoreImplementation defines the mixin interfaces and hides private methods.
 */
declare class FinderCore<FItem = any, FContext = any> {
    #private;
    constructor(items: FItem[] | null | undefined, options: FinderConstructorOptions<FItem, FContext>);
    get items(): FItem[];
    get context(): FContext;
    get isReady(): boolean;
    get isEmpty(): boolean;
    get hasMatches(): boolean;
    get isLoading(): boolean;
    get disabled(): boolean;
    get state(): "loading" | "empty" | "groups" | "items" | "noMatches";
    get updatedAt(): number;
    get events(): {
        on: (event: import("./types/event-types").FinderEventName, callback: import("./types/core-types").EventCallback) => void;
        off: (event: import("./types/event-types").FinderEventName, callback: import("./types/core-types").EventCallback) => void;
        silently: (callback: import("./types/core-types").EventCallback) => void;
        isSilent: () => boolean;
    };
    /**
     * Mixin interfaces
     */
    get matches(): import("./types/core-types").ResultSnapshot<FItem>;
    get search(): {
        rule: import("..").SearchRuleDefinition<unknown, any> | undefined;
        searchTerm: string;
        hasSearchTerm: boolean;
        hasSearchRule: boolean;
        setSearchTerm: (value: string) => void;
        reset: () => void;
        test: (searchTerm: string, isAdditive?: boolean) => FItem[];
    };
    get filters(): {
        values: Record<string, any>;
        raw: Record<string, any>;
        activeRules: (import("..").FilterRuleDefinition<unknown> & import("./types/rule-types").HydratedFilterOptions<any>)[];
        rules: (import("..").FilterRuleDefinition<unknown> & import("./types/rule-types").HydratedFilterOptions<any>)[];
        isActive: (identifier: string | import("..").FilterRuleDefinition) => boolean;
        get: (identifier: string | import("..").FilterRuleDefinition) => any;
        add: (identifier: string | import("..").FilterRuleDefinition, optionValue: any) => void;
        has: (identifier: string | import("..").FilterRuleDefinition, optionValue?: any) => boolean;
        getRule: (identifier: string | import("..").FilterRuleDefinition) => import("..").FilterRuleDefinition<unknown> & import("./types/rule-types").HydratedFilterOptions<any>;
        toggle: (identifier: string | import("..").FilterRuleDefinition, optionValue?: any) => void;
        set: <FValue>(identifier: string | import("..").FilterRuleDefinition, value: FValue | FValue[]) => void;
        delete: (identifier: string | import("..").FilterRuleDefinition, optionValue?: any) => void;
        reset: () => void;
        test: (options: import("./types/rule-types").FilterTestOptions) => any[];
        testRule: ({ rule: identifier, value, ...options }: import("./types/rule-types").FilterTestRuleOptions) => any[];
        testRuleOptions: (identifier: string | import("..").FilterRuleDefinition, isAdditive?: boolean) => Map<any, any>;
    };
    get sortBy(): {
        activeRule: import("..").SortByRuleDefinition<unknown, any> | undefined;
        sortDirection: import("..").SortDirection;
        userHasSetSortDirection: boolean;
        rules: import("..").SortByRuleDefinition<unknown, any>[];
        set: (identifier?: string | import("..").SortByRuleDefinition, incomingSortDirection?: import("..").SortDirection) => void;
        setSortDirection: (incomingSortDirection?: import("..").SortDirection) => void;
        cycleSortDirection: () => void;
        toggleSortDirection: () => void;
        reset: () => void;
    };
    get groupBy(): {
        activeRule: import("..").GroupByRuleDefinition<unknown, any> | undefined;
        requireGroup: boolean;
        rules: import("..").GroupByRuleDefinition<unknown, any>[];
        groupBySortDirection: import("..").SortDirection | undefined;
        set: (identifier?: string | import("..").GroupByRuleDefinition) => void;
        toggle: (identifier: import("..").GroupByRuleDefinition | string) => void;
        setGroupSortDirection: (direction?: import("..").SortDirection) => void;
        reset: () => void;
    };
    get pagination(): {
        page: number;
        offset: number;
        numItemsPerPage: number | undefined;
        numTotalItems: number;
        lastPage: number | undefined;
        isPaginated: boolean;
        setPage: (value: number) => void;
        setNumItemsPerPage: (value?: number) => void;
    };
    /**
     * Mutators
     */
    setItems(items: FItem[] | null | undefined): void;
    setIsLoading(value?: boolean): void;
    setIsDisabled(value?: boolean): void;
    setRules(definitions: FinderRuleDefinition<FItem>[]): void;
    setContext(context: FContext): void;
    /**
     * Utils
     */
    test(mixins: SnapshotSerializedMixins, isAdditive?: boolean): FItem[];
    getRule<T extends FinderRuleDefinition<FItem>>(identifier: string | FinderRuleDefinition<FItem>): T | undefined;
    toJSON(): Omit<FinderConstructorOptions<FItem, any>, "rules">;
}
export { FinderCore };
