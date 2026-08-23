import { FiltersMixin } from "./filters-mixin";
import { GroupByMixin } from "./group-by-mixin";
import { PaginationMixin } from "./pagination-mixin";
import { SearchMixin } from "./search-mixin";
import { SortByMixin } from "./sort-by-mixin";
import { ResultSnapshot, SnapshotOptions } from "./types/core-types";

export class Tester<FItem, FContext> {
    snapshot: ResultSnapshot<FItem> = {} as ResultSnapshot<FItem>;

    isStale = true;

    setIsStale(value: boolean) {
        this.isStale = value;
    }

    takeSnapshot({ items, context, mixins }: SnapshotOptions<FItem, FContext>) {
        this.snapshot = Tester.test({ items, context, mixins });
    }

    static test<FItem, FContext>({ mixins, items: rawItems, context }: SnapshotOptions<FItem, FContext>) {
        const matchingItems = Tester.testItems({ mixins, items: rawItems, context });
        const paginatedItems = Tester.paginateItems({ mixins, items: matchingItems, context });
        const hasGroupByRule = mixins.groupBy !== undefined;

        return {
            items: hasGroupByRule === false ? paginatedItems : undefined,
            groups: hasGroupByRule ? Tester.groupItems({ mixins, items: paginatedItems, context }) : undefined,
            numMatchedItems: matchingItems.length,
            numTotalItems: rawItems.length,
            hasGroupByRule,
        };
    }

    static testItems<FItem, FContext>({ mixins, items, context }: SnapshotOptions<FItem, FContext>) {
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

    static paginateItems<FItem, FContext>({ items, mixins }: SnapshotOptions<FItem, FContext>) {
        return mixins.pagination ? PaginationMixin.process(mixins.pagination, items) : items;
    }

    static groupItems<FItem, FContext>({ items, mixins, context }: SnapshotOptions<FItem, FContext>) {
        if (mixins.groupBy) {
            return GroupByMixin.process(mixins.groupBy, items, context);
        }
        throw new Error("Tester.groupItems called without a groupBy rule");
    }
}
