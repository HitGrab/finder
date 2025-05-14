import { FinderFilterRule, FinderOption } from "../../types";
import { FiltersMixin } from "./filters";
/**
 * Public surface for the Filters mixin
 */
declare function filtersAPI<FItem>(mixin: FiltersMixin<FItem>): {
    value: Record<string, any>;
    rules: FinderFilterRule<unknown, any>[];
    toggle(identifier: FinderFilterRule | string): void;
    toggleOption(identifier: FinderFilterRule | string, optionValue: FinderOption | any): void;
    get: (identifier: FinderFilterRule | string) => any;
    set: (identifier: FinderFilterRule | string, incomingFilterValue: any) => void;
    delete: (identifier: FinderFilterRule | string) => void;
    test: (identifier: FinderFilterRule | string, filterValue: any, incomingMeta?: import("../../types").FinderMeta | undefined) => FItem[];
    testOptions: (identifier: FinderFilterRule | string, incomingMeta?: import("../../types").FinderMeta | undefined) => Map<boolean | FinderOption<any>, FItem[]>;
};
export { filtersAPI };
