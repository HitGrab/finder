import {
    filterRule,
    Finder,
    FinderContent,
    FinderEvent,
    finderRuleset,
    finderSequentialCharacterCompare,
    groupByRule,
    searchRule,
    sortByRule,
} from "@hitgrab/finder";
import "./global.css";
import { useGetItems } from "./hooks/use-get-items";
import { capitalize, range } from "lodash";
import { SearchInput } from "./components/search-input";
import { QuantityFilter } from "./components/quantity-filter";
import { EquipmentCard, EquipmentCardSkeleton } from "./components/equipment-card";
import { useCallback } from "react";
import { RarityFilter } from "./components/rarity-filter";
import { SortByDropdown } from "./components/sort-by-dropdown";
import { GroupByDropdown } from "./components/group-by-dropdown";
import { appendEventString } from "./utils/event-stream-util";

function App() {
    const { data, isPending } = useGetItems();

    // to prevent a React error with multiple points of the virtual dom being updated simultaneously, we leave React to update the DOM directly.
    const handleEventStream = useCallback((event: FinderEvent) => {
        appendEventString(event);
    }, []);

    const rules = finderRuleset<Equipment>([
        searchRule({
            haystackFn: (item) => item.name,
            debounceMilliseconds: 200,
        }),
        filterRule({
            id: "has_quantity",
            filterFn: (item) => item.quantity > 0,
            isBoolean: true,
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

    return (
        <Finder
            items={data}
            rules={rules}
            isLoading={isPending}
            onInit={handleEventStream}
            onFirstUserInteraction={handleEventStream}
            onChange={handleEventStream}
            onReady={handleEventStream}
        >
            <div className="layout">
                <div className="controls">
                    <SearchInput />
                    <QuantityFilter />
                    <RarityFilter />
                    <SortByDropdown />
                    <GroupByDropdown />
                </div>
                <div className="equipmentList">
                    <FinderContent>
                        {{
                            loading: range(0, 12).map((index) => <EquipmentCardSkeleton key={index} />),
                            empty: "No items in list",
                            noMatches: "No matches found.",
                            items: ({ items, selectedItems }) => {
                                return items.map((item: Equipment) => {
                                    return (
                                        <EquipmentCard
                                            item={item}
                                            isSelected={selectedItems.isSelected(item)}
                                            onSelect={() => selectedItems.toggleOnly(item)}
                                            key={item.name}
                                        />
                                    );
                                });
                            },
                            groups: ({ groups, selectedItems }) => {
                                return groups.map(({ id, items }) => {
                                    return (
                                        <div className="group" key={id}>
                                            <div className="title">{capitalize(id)}</div>
                                            {items.map((item: Equipment) => {
                                                return (
                                                    <EquipmentCard
                                                        item={item}
                                                        isSelected={selectedItems.isSelected(item)}
                                                        onSelect={() => selectedItems.toggleOnly(item)}
                                                        key={item.name}
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                });
                            },
                        }}
                    </FinderContent>
                </div>
            </div>
            Assets from https://emblemadept.itch.io/pixel-armor-pack-3-greece-rome
        </Finder>
    );
}

export { App };
