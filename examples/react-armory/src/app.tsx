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
    useFinderRef,
} from "@hitgrab/finder";
import "./global.css";
import { useGetItems } from "./hooks/use-get-items";
import { capitalize, defer, range } from "lodash";
import { SearchInput } from "./components/search-input";
import { QuantityFilter } from "./components/quantity-filter";
import { EquipmentCard, EquipmentCardSkeleton } from "./components/equipment-card";
import { EventStream } from "./components/event-stream";
import { useState, useCallback } from "react";
import { RarityFilter } from "./components/rarity-filter";
import { SortByDropdown } from "./components/sort-by-dropdown";
import { GroupByDropdown } from "./components/group-by-dropdown";

function App() {
    const { data, isPending } = useGetItems();
    const ref = useFinderRef();
    const [eventStream, setEventStream] = useState<FinderEvent[]>([]);
    const handleEventStream = useCallback((event: FinderEvent) => {
        // This defer hack is to get around React rendering JSX to two elements at once.
        defer(() => {
            if (event.event === "finder.core.init") {
                return setEventStream([event]);
            }
            setEventStream((initialEvents) => [...initialEvents, event]);
        });
    }, []);

    const rules = finderRuleset<Equipment>([
        searchRule({
            searchFn: (item, searchTerm) => finderSequentialCharacterCompare(item.name, searchTerm),
            debounceDelay: 200,
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
            controllerRef={ref}
            onInit={handleEventStream}
            onFirstUserInteraction={handleEventStream}
            onChange={handleEventStream}
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
                            items: ({ items }) => {
                                return items.map((item: Equipment) => {
                                    const isSelected = !!ref.current?.selectedItems.isSelected(item);
                                    return (
                                        <EquipmentCard
                                            item={item}
                                            isSelected={isSelected}
                                            onSelect={() => ref.current?.selectedItems.toggleOnly(item)}
                                            key={item.name}
                                        />
                                    );
                                });
                            },
                            groups: ({ groups }) => {
                                return groups.map(({ id, items }) => {
                                    return (
                                        <div className="group" key={id}>
                                            <div className="title">{capitalize(id)}</div>
                                            {items.map((item: Equipment) => {
                                                const isSelected = !!ref.current?.selectedItems.isSelected(item);
                                                return (
                                                    <EquipmentCard
                                                        item={item}
                                                        isSelected={isSelected}
                                                        onSelect={() => ref.current?.selectedItems.toggleOnly(item)}
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
            <EventStream stream={eventStream} />
        </Finder>
    );
}

export { App };
