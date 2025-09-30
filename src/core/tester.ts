import { FiltersMixin } from "./filters";
import { GroupByMixin } from "./group-by";
import { PaginationMixin } from "./pagination";
import { SearchMixin } from "./search";
import { SortByMixin } from "./sort-by";
import { FinderResultGroup, ResultSnapshot, SnapshotOptions } from "./types/core-types";

export class Tester<FItem, FContext> {
    snapshot: ResultSnapshot<FItem> = {} as ResultSnapshot<FItem>;

    isStale = true;

    setIsStale(value: boolean) {
        this.isStale = value;
    }

    takeSnapshot({ items, context, mixins }: SnapshotOptions<FItem, FContext>) {
        // process items
        const matchingItems = Tester.test({ mixins, items, context });

        // post-process items
        const paginatedItems = mixins.pagination ? PaginationMixin.process(mixins.pagination, matchingItems) : matchingItems;

        let groups: FinderResultGroup<FItem>[] = [];
        const hasGroupByRule = mixins.groupBy !== undefined;
        if (mixins.groupBy) {
            groups = GroupByMixin.process(mixins.groupBy, paginatedItems, context);
        }

        this.snapshot = {
            items: !hasGroupByRule ? paginatedItems : undefined,
            groups: hasGroupByRule ? groups : undefined,
            numMatchedItems: matchingItems.length,
            numTotalItems: items.length,
            hasGroupByRule,
        };
    }

    static test<FItem, FContext>({ mixins, items, context }: SnapshotOptions<FItem, FContext>) {
        let matchingItems = [...items];
        if (mixins.search) {
            matchingItems = SearchMixin.process(mixins.search, matchingItems, context);
        }
        if (mixins.filters) {
            matchingItems = FiltersMixin.process(mixins.filters, matchingItems, context);
        }
        if (mixins.sortBy) {
            matchingItems = SortByMixin.process(mixins.sortBy, matchingItems, context);
        }
        return matchingItems;
    }
}
