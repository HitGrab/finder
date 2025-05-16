import { FinderInjectedHandlers, FilterRule, FinderOption, FinderMeta, HydratedFilterRule } from "../../types";
declare class FiltersMixin<FItem> {
    #private;
    filters: Record<string, any>;
    constructor(initialFilters: Record<string, any> | undefined, handlers: FinderInjectedHandlers<FItem>);
    set(identifier: FilterRule | HydratedFilterRule | string, incomingFilterValue: any): void;
    get rules(): HydratedFilterRule<unknown, any>[];
    get activeRules(): HydratedFilterRule<unknown, any>[];
    get activeRuleIds(): any[];
    get(identifier: string | FilterRule | HydratedFilterRule): any;
    isActive(identifier: string | FilterRule | HydratedFilterRule): boolean;
    toggleOption(identifier: string | FilterRule | HydratedFilterRule, optionValue: FinderOption | any): void;
    test(identifier: string | FilterRule | HydratedFilterRule, filterValue: any, incomingMeta?: FinderMeta | undefined): FItem[];
    testOptions(identifier: FilterRule | HydratedFilterRule | string, meta?: FinderMeta | undefined): Map<boolean | FinderOption<any>, FItem[]>;
    process(items: FItem[], meta?: FinderMeta): FItem[];
    static process<FItem>(items: FItem[], rules: HydratedFilterRule[], values: Record<string, any>, meta?: FinderMeta): FItem[];
    static isActive(rule: FilterRule | HydratedFilterRule, value: any): boolean;
}
export { FiltersMixin };
