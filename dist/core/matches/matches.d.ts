import { MatchesSnapshot } from "../../types";
import { FiltersMixin } from "../filters/filters";
import { GroupByMixin } from "../group-by/group-by";
import { PaginationMixin } from "../pagination/pagination";
import { SearchMixin } from "../search/search";
import { SortByMixin } from "../sort-by/sort-by";
type MixinList<FItem, FContext> = {
    search: SearchMixin<FItem>;
    filters: FiltersMixin;
    sortBy: SortByMixin<FItem>;
    groupBy: GroupByMixin<FItem, FContext>;
    pagination: PaginationMixin<FItem>;
};
export declare class MatchesMixin<FItem, FContext> {
    snapshot: MatchesSnapshot<FItem>;
    isStale: boolean;
    constructor();
    setIsStale(value: boolean): void;
    takeSnapshot(items: FItem[], context: FContext, mixins: MixinList<FItem, FContext>, ignoreSortByRulesWhileSearchRuleIsActive: boolean): void;
}
export {};
