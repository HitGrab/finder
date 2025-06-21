import { HydratedFilterRule, FilterRule, FilterOption, FilterTestOptions, FilterTestRuleOptions, FilterTestRuleOptionsOptions, MetaInterface } from "../../types";
import { MixinInjectedDependencies } from "../types/internal-types";
type InitialValues = {
    initialFilters: Record<string, any> | undefined;
};
declare class FiltersMixin<FItem> {
    #private;
    filters: Record<string, any>;
    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    set(identifier: FilterRule | HydratedFilterRule | string, incomingFilterValue: any): void;
    get rules(): HydratedFilterRule<FItem>[];
    recalculateHydratedRules(): void;
    getRule(id: string): HydratedFilterRule<FItem> | undefined;
    get activeRules(): HydratedFilterRule<FItem>[];
    get(identifier: string | FilterRule | HydratedFilterRule): any;
    has(identifier: string | FilterRule | HydratedFilterRule, optionValue?: FilterOption | any): any;
    delete(identifier: string | FilterRule | HydratedFilterRule): void;
    isActive(identifier: string | FilterRule | HydratedFilterRule): boolean;
    toggle(identifier: string | FilterRule | HydratedFilterRule): void;
    toggleOption(identifier: string | FilterRule | HydratedFilterRule, optionValue: FilterOption | any): void;
    test(options: FilterTestOptions): FItem[];
    testRule({ rule: identifier, value, ...options }: FilterTestRuleOptions): FItem[];
    testRuleOptions({ rule: identifier, ...options }: FilterTestRuleOptionsOptions): Map<any, any>;
    getFilters(): Record<string, any>;
    process(items: FItem[], meta: MetaInterface): FItem[];
    static process<FItem>(items: FItem[], rules: HydratedFilterRule[], values: Record<string, any>, meta: MetaInterface): FItem[];
    static isActive(rule: FilterRule | HydratedFilterRule, value: any): boolean;
}
export { FiltersMixin };
