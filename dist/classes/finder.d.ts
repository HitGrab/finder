import { FinderConstructorOptions, MatchesSnapshot } from "../types";
declare class Finder<FItem> {
    #private;
    isLoading: boolean;
    disabled: boolean;
    constructor(items: FItem[] | null | undefined, { rules, initialSearchTerm, initialSortby, initialSortDirection, initialGroupBy, initialFilters, initialSelectedItems, initialMeta, page, numItemsPerPage, isLoading, disabled, requireGroup, maxSelectedItems, onInit, onChange, }: FinderConstructorOptions<FItem>);
    initializeOnce(): void;
    get matches(): MatchesSnapshot<FItem>;
    get isEmpty(): boolean;
    get search(): {
        searchTerm: string;
        hasSearchRule: boolean;
        setSearchTerm: (incomingSearchTerm: string) => void;
    };
    get filters(): {
        value: Record<string, any>;
        rules: import("../types").FinderFilterRule<unknown, any>[];
        toggle(identifier: import("../types").FinderFilterRule | string): void;
        toggleOption(identifier: import("../types").FinderFilterRule | string, optionValue: import("../types").FinderOption | any): void;
        get: (identifier: import("../types").FinderFilterRule | string) => any;
        set: (identifier: import("../types").FinderFilterRule | string, incomingFilterValue: any) => void;
        delete: (identifier: import("../types").FinderFilterRule | string) => void;
        test: (identifier: import("../types").FinderFilterRule | string, filterValue: any, incomingMeta?: import("../types").FinderMeta | undefined) => FItem[];
        testOptions: (identifier: import("../types").FinderFilterRule | string, incomingMeta?: import("../types").FinderMeta | undefined) => Map<boolean | import("../types").FinderOption<any>, FItem[]>;
    };
    get sortBy(): {
        activeRule: import("../types").FinderSortByRule<unknown> | undefined;
        activeRuleId: string | undefined;
        sortDirection: import("../types").FinderSortDirection;
        rules: import("../types").FinderSortByRule<unknown>[];
        set: (identifier: import("../types").FinderSortByRule | string | undefined, incomingSortDirection?: import("../types").FinderSortDirection) => void;
        setSortDirection: (incomingSortDirection: import("../types").FinderSortDirection) => void;
        cycleSortDirection: () => void;
        reset(): void;
    };
    get groupBy(): {
        activeRule: import("../types").FinderGroupByRule<unknown> | undefined;
        activeRuleId: string | undefined;
        requireGroup: boolean;
        rules: import("../types").FinderGroupByRule<unknown>[];
        set(identifier?: import("../types").FinderGroupByRule | string): void;
        toggle: (identifier: import("../types").FinderGroupByRule | string) => void;
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
        isSelected: (item: FItem) => boolean;
        reset: () => void;
    };
    setItems(items: FItem[] | null | undefined): void;
    setIsLoading(value?: boolean): void;
    setDisabled(value?: boolean): void;
}
export { Finder };
