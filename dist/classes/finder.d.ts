import { FinderConstructorOptions, MatchesSnapshot } from "../types";
declare class Finder<FItem> {
    #private;
    isLoading: boolean;
    disabled: boolean;
    updatedAt?: number;
    constructor(items: FItem[] | null | undefined, { rules, initialSearchTerm, initialSortby, initialSortDirection, initialGroupBy, initialFilters, initialSelectedItems, initialMeta, page, numItemsPerPage, isLoading, disabled, requireGroup, maxSelectedItems, onInit, onChange, }: FinderConstructorOptions<FItem>);
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
        activeRules: import("..").FilterRule<unknown, any>[];
        activeRuleIds: string[];
        rules: import("..").FilterRule<unknown, any>[];
        isActive: (identifier: import("..").FilterRule | string) => boolean;
        toggle(identifier: import("..").FilterRule | string): void;
        toggleOption: (identifier: import("..").FilterRule | string, optionValue: import("..").FinderOption | any) => void;
        get: (identifier: import("..").FilterRule | string) => any;
        set: (identifier: import("..").FilterRule | string, incomingFilterValue: any) => void;
        delete: (identifier: import("..").FilterRule | string) => void;
        test: (identifier: import("..").FilterRule | string, filterValue: any, incomingMeta?: import("../types").FinderMeta | undefined) => FItem[];
        testOptions: (identifier: import("..").FilterRule | string, incomingMeta?: import("../types").FinderMeta | undefined) => Map<boolean | import("..").FinderOption<any>, FItem[]>;
    };
    get sortBy(): {
        activeRule: import("..").SortByRule<unknown> | undefined;
        activeRuleId: string | undefined;
        sortDirection: import("../types").FinderSortDirection;
        rules: import("..").SortByRule<unknown>[];
        set: (identifier: import("..").SortByRule | string | undefined, incomingSortDirection?: import("../types").FinderSortDirection) => void;
        setSortDirection: (incomingSortDirection: string | string[] | undefined) => void;
        cycleSortDirection: () => void;
        reset(): void;
    };
    get groupBy(): {
        activeRule: import("..").GroupByRule<unknown> | undefined;
        activeRuleId: string | undefined;
        requireGroup: boolean;
        rules: import("..").GroupByRule<unknown>[];
        set(identifier?: import("..").GroupByRule | string): void;
        toggle: (identifier: import("..").GroupByRule | string) => void;
        reset: () => void;
    };
    get meta(): {
        value: import("../types").FinderMeta | undefined;
        set: (metaIdentifier: any, value: any) => void;
        get: (metaIdentifier: any) => any;
        delete: (metaIdentifier: any) => void;
        reset: () => void;
    };
    get pagination(): {
        page: number | undefined;
        numItemsPerPage: number | undefined;
        numTotalItems: number;
        lastPage: number | undefined;
        isPaginated: boolean;
        setPage: (value?: number) => void;
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
    get searchRule(): import("..").SearchRule<unknown> | undefined;
    get sortRules(): import("..").SortByRule<unknown>[];
    get filterRules(): import("..").FilterRule<unknown, any>[];
    get groupByRules(): import("..").GroupByRule<unknown>[];
    setItems(items: FItem[] | null | undefined): void;
    setIsLoading(value?: boolean): void;
    setDisabled(value?: boolean): void;
}
export { Finder };
