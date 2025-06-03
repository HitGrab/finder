import { MatchesSnapshot, FinderConstructorOptions } from "../types";
declare class Finder<FItem> {
    #private;
    isLoading: boolean;
    disabled: boolean;
    updatedAt?: number;
    constructor(items: FItem[] | null | undefined, { rules, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialFilters, initialSelectedItems, initialMeta, page, numItemsPerPage, isLoading, disabled, requireGroup, maxSelectedItems, onInit, onChange, }: FinderConstructorOptions<FItem>);
    initializeOnce(): void;
    get items(): FItem[];
    get matches(): MatchesSnapshot<FItem>;
    get isEmpty(): boolean;
    get search(): {
        searchTerm: string;
        activeRule: import("..").SearchRule<unknown> | undefined;
        hasSearchTerm: boolean;
        setSearchTerm: (incomingSearchTerm: string) => void;
        reset: () => void;
    };
    get filters(): {
        value: Record<string, any>;
        filters: Record<string, any>;
        activeRules: import("..").HydratedFilterRule<FItem, any>[];
        activeRuleIds: string[];
        rules: import("..").HydratedFilterRule<FItem, any>[];
        isActive: (identifier: string | import("..").FilterRule | import("..").HydratedFilterRule) => boolean;
        toggle(identifier: string | import("..").FilterRule | import("..").HydratedFilterRule): void;
        toggleOption: (identifier: string | import("..").FilterRule | import("..").HydratedFilterRule, optionValue: import("..").FinderOption | any) => void;
        get: (identifier: string | import("..").FilterRule | import("..").HydratedFilterRule) => any;
        set: (identifier: import("..").FilterRule | import("..").HydratedFilterRule | string, incomingFilterValue: any) => void;
        has: (identifier: string | import("..").FilterRule | import("..").HydratedFilterRule, optionValue?: import("..").FinderOption | any) => any;
        delete: (identifier: string | import("..").FilterRule | import("..").HydratedFilterRule) => void;
        test: (options: import("../types").FilterTestOptions) => FItem[];
        testRule: ({ rule: identifier, value, ...options }: import("../types").FilterTestRuleOptions) => FItem[];
        testRuleOptions: ({ rule: identifier, ...options }: import("../types").FilterTestRuleOptionsOptions) => Map<boolean | import("..").FinderOption<any>, FItem[]>;
    };
    get sortBy(): {
        activeRule: import("..").SortByRule<unknown> | undefined;
        activeRuleId: string | undefined;
        sortDirection: string | undefined;
        rules: import("..").SortByRule<unknown>[];
        set: (identifier?: string | import("..").SortByRule, incomingSortDirection?: string) => void;
        setSortDirection: (incomingSortDirection?: string) => void;
        cycleSortDirection: () => void;
        toggleSortDirection: () => void;
        reset(): void;
    };
    get groupBy(): {
        activeRule: import("..").GroupByRule<unknown> | undefined;
        activeRuleId: string | undefined;
        requireGroup: boolean;
        rules: import("..").GroupByRule<unknown>[];
        groupIdSortDirection: string | undefined;
        set: (identifier?: import("..").GroupByRule | string) => void;
        toggle: (identifier: import("..").GroupByRule | string) => void;
        setGroupIdSortDirection: (direction?: string) => void;
        reset: () => void;
    };
    get meta(): {
        value: import("../types").FinderMeta | undefined;
        set: (metaIdentifier: any, value: any) => void;
        get: (metaIdentifier: any) => any;
        has: (metaIdentifier: any) => boolean;
        delete: (metaIdentifier: any) => void;
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
    get selectedItems(): {
        items: FItem[];
        maxSelectedItems: number | undefined;
        setMaxSelectedItems: (value?: number) => void;
        select: (item: FItem) => void;
        delete: (item: FItem) => void;
        toggle: (item: FItem) => void;
        isSelected: (item: FItem) => boolean;
        reset: () => void;
    };
    setItems(items: FItem[] | null | undefined): void;
    setIsLoading(value?: boolean): void;
    setDisabled(value?: boolean): void;
}
export { Finder };
