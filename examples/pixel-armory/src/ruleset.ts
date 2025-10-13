import { finderRuleset, searchRule, filterRule, sortByRule, groupByRule } from "@hitgrab/finder";

export const ruleset = finderRuleset<Equipment>([
    searchRule({
        searchFn: (item) => item.name,
        debounceMilliseconds: 200,
    }),
    filterRule({
        id: "has_quantity",
        filterFn: (item) => item.quantity > 0,
        boolean: true,
    }),
    filterRule({
        id: "rarity",
        filterFn: (item, value) => {
            return value.includes(item.rarity);
        },
        options: [
            { label: "Common", value: "common" },
            { label: "Uncommon", value: "uncommon" },
            { label: "Rare", value: "rare" },
        ],
        multiple: true,
    }),
    sortByRule({ id: "item_name", sortFn: (item) => item.name, label: "Name" }),
    sortByRule({ id: "item_attack", sortFn: (item) => item.atk, label: "Attack", defaultSortDirection: "desc" }),
    sortByRule({ id: "item_defense", sortFn: (item) => item.def, label: "Defense", defaultSortDirection: "desc" }),
    groupByRule({ id: "rarity_group", groupFn: (item) => item.rarity, sticky: { header: ["rare", "uncommon", "common"] } }),
]);
