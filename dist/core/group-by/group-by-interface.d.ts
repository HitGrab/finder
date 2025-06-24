import { GroupByMixin } from "./group-by";
/**
 * Public surface for the Group By mixin
 */
declare function readonlyGroupByInterface<FItem>(mixin: GroupByMixin<FItem>): {
    activeRule: import("../..").GroupByRule<unknown> | undefined;
    requireGroup: boolean;
    rules: import("../..").GroupByRule<unknown>[];
    groupIdSortDirection: import("../..").SortDirection | undefined;
};
declare function groupByInterface<FItem>(mixin: GroupByMixin<FItem>): {
    set: (identifier?: import("../..").GroupByRule | string) => void;
    toggle: (identifier: import("../..").GroupByRule | string) => void;
    setGroupIdSortDirection: (direction?: import("../..").SortDirection) => void;
    reset: () => void;
    activeRule: import("../..").GroupByRule<unknown> | undefined;
    requireGroup: boolean;
    rules: import("../..").GroupByRule<unknown>[];
    groupIdSortDirection: import("../..").SortDirection | undefined;
};
export { readonlyGroupByInterface, groupByInterface };
