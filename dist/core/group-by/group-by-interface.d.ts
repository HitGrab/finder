import { GroupByMixin } from "./group-by";
/**
 * Public surface for the Group By mixin
 */
declare function readonlyGroupByInterface<FItem, FContext>(mixin: GroupByMixin<FItem, FContext>): {
    activeRule: import("../..").GroupByRule<unknown, any> | undefined;
    requireGroup: boolean;
    rules: import("../..").GroupByRule<unknown, any>[];
    groupIdSortDirection: import("../..").SortDirection | undefined;
};
declare function groupByInterface<FItem, FContext>(mixin: GroupByMixin<FItem, FContext>): {
    set: (identifier?: string | import("../..").GroupByRule) => void;
    toggle: (identifier: import("../..").GroupByRule | string) => void;
    setGroupIdSortDirection: (direction?: import("../..").SortDirection) => void;
    reset: () => void;
    activeRule: import("../..").GroupByRule<unknown, any> | undefined;
    requireGroup: boolean;
    rules: import("../..").GroupByRule<unknown, any>[];
    groupIdSortDirection: import("../..").SortDirection | undefined;
};
export { readonlyGroupByInterface, groupByInterface };
