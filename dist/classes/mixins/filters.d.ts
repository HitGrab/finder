import { FinderInjectedHandlers, FilterRule, FinderOption, FinderMeta } from "../../types";
declare class FiltersMixin<FItem> {
    #private;
    filters: Record<string, any>;
    constructor(initialFilters: Record<string, any> | undefined, handlers: FinderInjectedHandlers<FItem>);
    set(identifier: FilterRule | string, incomingFilterValue: any): void;
    get rules(): FilterRule<unknown, any>[];
    get activeRules(): FilterRule<unknown, any>[];
    get activeRuleIds(): string[];
    get(identifier: FilterRule | string): any;
    isActive(identifier: FilterRule | string): boolean;
    toggleOption(identifier: FilterRule | string, optionValue: FinderOption | any): void;
    test(identifier: FilterRule | string, filterValue: any, incomingMeta?: FinderMeta | undefined): FItem[];
    testOptions(identifier: FilterRule | string, incomingMeta?: FinderMeta | undefined): Map<boolean | FinderOption<any>, FItem[]>;
    process(items: FItem[], meta?: FinderMeta): FItem[];
    static process<FItem>(items: FItem[], rules: FilterRule[], values: Record<string, any>, meta?: FinderMeta): FItem[];
    static isActive(rule: FilterRule, value: any): boolean;
}
export { FiltersMixin };
