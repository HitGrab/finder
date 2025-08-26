import { FinderResultGroup, MatchesSnapshot } from "../../types";
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
export class MatchesMixin<FItem, FContext> {
    snapshot: MatchesSnapshot<FItem> = {} as MatchesSnapshot<FItem>;
    isStale = true;

    constructor() {}

    setIsStale(value: boolean) {
        this.isStale = value;
    }

    takeSnapshot(items: FItem[], context: FContext, mixins: MixinList<FItem, FContext>, ignoreSortByRulesWhileSearchRuleIsActive: boolean) {
        let itemsToProcess: FItem[] = [];
        let groups: FinderResultGroup<FItem>[] = [];

        const hasGroupByRule = mixins.groupBy.activeRule !== undefined;
        let paginatedItemSlice: FItem[] = [];

        itemsToProcess = [...items];
        itemsToProcess = mixins.search.process(itemsToProcess, context);
        itemsToProcess = mixins.filters.process(itemsToProcess, context);

        const ignoreSortByRules =
            ignoreSortByRulesWhileSearchRuleIsActive === true && mixins.search.hasSearchRule === true && mixins.search.hasSearchTerm === true;

        if (ignoreSortByRules === false) {
            itemsToProcess = mixins.sortBy.process(itemsToProcess);
        }

        paginatedItemSlice = mixins.pagination.process(itemsToProcess);

        if (hasGroupByRule) {
            groups = mixins.groupBy.process(paginatedItemSlice, context);
        }

        this.snapshot = {
            items: !hasGroupByRule ? paginatedItemSlice : undefined,
            groups: hasGroupByRule ? groups : undefined,
            numMatchedItems: itemsToProcess.length,
            numTotalItems: items.length,
            hasGroupByRule,
        };
    }
}
