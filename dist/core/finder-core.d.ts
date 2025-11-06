import { FinderConstructorOptions, SnapshotSerializedMixins } from "./types/core-types";
import { RuleDefinition } from "./types/rule-types";
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
        activeRules: import("./types/rule-types").FilterRuleUnionHydratedDefinition<unknown>[];
        rules: import("./types/rule-types").FilterRuleUnionHydratedDefinition<unknown>[];
        isActive: (identifier: string | Omit<import("..").FilterRuleDefinition<any, any, any>, "options">) => boolean;
        get: (identifier: string | Omit<import("..").FilterRuleDefinition<any, any, any>, "options">) => any;
        add: {
            <FValue>(identifier: Omit<import("./types/rule-types").FilterRuleWithMultipleValues<any, FValue>, "options">, optionValue?: FValue): void;
            (identifier: string, optionValue?: unknown): void;
        };
        has: (identifier: string | Omit<import("..").FilterRuleDefinition<any, any, any>, "options">, optionValue?: any) => boolean;
        getRule: (identifier: string | Omit<import("..").FilterRuleDefinition<any, any, any>, "options">) => import("./types/rule-types").FilterRuleWithBooleanValueAndHydratedOptions<any, any, any> | import("./types/rule-types").FilterRuleWithMultipleValuesAndHydratedOptions<any, any, any> | import("./types/rule-types").FilterRuleWithSingleValueAndHydratedOptions<any, any, any>;
        toggle: {
            (identifier: string, optionValue?: any): void;
            <FValue extends boolean>(identifier: import("./types/rule-types").FilterRuleWithBooleanValue<any, FValue>): void;
            <FValue>(identifier: import("./types/rule-types").FilterRuleWithMultipleValues<any, FValue>, optionValue?: FValue): void;
        };
        set: {
            <FValue>(identifier: Omit<import("./types/rule-types").FilterRuleWithMultipleValues<any, FValue>, "options">, value?: FValue[]): void;
            <FValue>(identifier: Omit<import("..").FilterRuleDefinition<any, FValue>, "options">, value?: FValue): void;
            (identifier: string, value?: unknown): void;
        };
        delete: {
            <FValue>(identifier: Omit<import("./types/rule-types").FilterRuleWithMultipleValues<any, FValue>, "options">, optionValue?: FValue): void;
            (identifier: string, optionValue?: unknown): void;
            (identifier: string | Omit<import("..").FilterRuleDefinition<any, any, any>, "options">, optionValue?: never): void;
        };
        reset: () => void;
        test: (options: import("./types/rule-types").FilterTestOptions) => any[];
        testRule: ({ rule: identifier, value, ...options }: import("./types/rule-types").FilterTestRuleOptions) => any[];
        testRuleOptions: (identifier: string | Omit<import("..").FilterRuleDefinition<any, any, any>, "options">, isAdditive?: boolean) => Map<any, any>;
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
        set: (identifier?: string | import("..").GroupByRuleDefinition<any, any>) => void;
        toggle: (identifier: string | import("..").GroupByRuleDefinition<any, any>) => void;
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
    setRules(definitions: RuleDefinition<FItem>[]): void;
    setContext(context: FContext): void;
    /**
     * Utils
     */
    test(mixins: SnapshotSerializedMixins, isAdditive?: boolean): FItem[];
    getRule<T extends RuleDefinition<FItem>>(identifier: string | RuleDefinition<FItem>): T | undefined;
    toJSON(): Omit<FinderConstructorOptions<FItem, any>, "rules">;
}
export { FinderCore };
