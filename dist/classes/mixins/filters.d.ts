import { FinderInjectedHandlers, FinderFilterRule, FinderOption, FinderMeta } from "../../types";
declare class FiltersMixin<FItem> {
    #private;
    filters: Record<string, any>;
    constructor(initialFilters: Record<string, any> | undefined, handlers: FinderInjectedHandlers<FItem>);
    set(identifier: FinderFilterRule | string, incomingFilterValue: any): void;
    get rules(): FinderFilterRule<unknown, any>[];
    get(identifier: FinderFilterRule | string): any;
    test(identifier: FinderFilterRule | string, filterValue: any, incomingMeta?: FinderMeta | undefined): FItem[];
    testOptions(identifier: FinderFilterRule | string, incomingMeta?: FinderMeta | undefined): Map<boolean | FinderOption<any>, FItem[]>;
    process(items: FItem[], meta?: FinderMeta): FItem[];
    static process<FItem>(items: FItem[], rules: FinderFilterRule[], values: Record<string, any>, meta?: FinderMeta): FItem[];
}
/**
 * Filters are static arrays, and may not all be active.
 * This method identifies which filters have matching filterValues that make them relevant.
 */
export declare function composeActiveFilterRules<Item>(rules?: FinderFilterRule<Item>[], filterValues?: Record<string, any>): FinderFilterRule<Item, any>[];
export { FiltersMixin };
