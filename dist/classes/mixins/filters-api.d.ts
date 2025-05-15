import { FilterRule, FinderOption } from "../../types";
import { FiltersMixin } from "./filters";
/**
 * Public surface for the Filters mixin
 */
declare function filtersAPI<FItem>(mixin: FiltersMixin<FItem>): {
    value: Record<string, any>;
    activeRules: FilterRule<unknown, any>[];
    activeRuleIds: string[];
    rules: FilterRule<unknown, any>[];
    isActive: (identifier: FilterRule | string) => boolean;
    toggle(identifier: FilterRule | string): void;
    toggleOption: (identifier: FilterRule | string, optionValue: FinderOption | any) => void;
    get: (identifier: FilterRule | string) => any;
    set: (identifier: FilterRule | string, incomingFilterValue: any) => void;
    delete: (identifier: FilterRule | string) => void;
    test: (identifier: FilterRule | string, filterValue: any, incomingMeta?: import("../../types").FinderMeta | undefined) => FItem[];
    testOptions: (identifier: FilterRule | string, incomingMeta?: import("../../types").FinderMeta | undefined) => Map<boolean | FinderOption<any>, FItem[]>;
};
export { filtersAPI };
