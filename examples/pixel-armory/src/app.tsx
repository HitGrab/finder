import { Finder, FinderContentProps, FinderEvent } from "@hitgrab/finder";
import "./global.css";
import { capitalize, range } from "lodash";
import { SearchInput } from "./components/search-input";
import { QuantityFilter } from "./components/quantity-filter";
import { EquipmentCard, EquipmentCardSkeleton } from "./components/equipment-card";
import { useCallback, useMemo, useState } from "react";
import { RarityFilter } from "./components/rarity-filter";
import { SortByDropdown } from "./components/sort-by-dropdown";
import { GroupByDropdown } from "./components/group-by-dropdown";
import { appendEventString } from "./utils/event-stream-util";
import { useGetEquipment } from "./hooks/use-get-equipment";
import { ruleset } from "./ruleset";

interface FinderContext {
    isSelected: (item: Equipment) => boolean;
    toggle: (item: Equipment) => void;
}

function App() {
    const { data, isPending } = useGetEquipment();

    // to prevent a React error with multiple points of the virtual dom being updated simultaneously, we leave React to update the DOM directly.
    const handleEventStream = useCallback((event: FinderEvent) => {
        appendEventString(event);
    }, []);

    const [selectedItems, setSelectedItems] = useState<Equipment[]>([]);
    const context: FinderContext = useMemo(() => {
        return {
            isSelected: (item: Equipment) => selectedItems.includes(item),
            toggle: (item: Equipment) => {
                if (selectedItems.includes(item)) {
                    return setSelectedItems([...selectedItems.filter((row) => row !== item)]);
                }
                return setSelectedItems([...selectedItems, item]);
            },
        };
    }, [selectedItems, setSelectedItems]);

    return (
        <Finder
            items={data}
            rules={ruleset}
            isLoading={isPending}
            onInit={handleEventStream}
            onFirstUserInteraction={handleEventStream}
            onChange={handleEventStream}
            onReady={handleEventStream}
            ignoreSortByRulesWhileSearchRuleIsActive={true}
            context={context}
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
                    <Finder.Content>
                        {{
                            loading: range(0, 12).map((index) => <EquipmentCardSkeleton key={index} />),
                            empty: "No items in list",
                            noMatches: "No matches found.",
                            items: Items,
                            groups: Groups,
                        }}
                    </Finder.Content>
                </div>
            </div>
            Assets from https://emblemadept.itch.io/pixel-armor-pack-3-greece-rome
        </Finder>
    );
}

function Items({ items, context }: FinderContentProps<Equipment, FinderContext>["items"]) {
    return items.map((item) => {
        return <EquipmentCard item={item} isSelected={context.isSelected(item)} onSelect={() => context.toggle(item)} key={item.key} />;
    });
}
function Groups({ groups, context }: FinderContentProps<Equipment, FinderContext>["groups"]) {
    return groups.map((group) => {
        return (
            <div className="group" key={group.id}>
                <div className="title">{capitalize(group.id)}</div>
                {group.items.map((item: Equipment) => {
                    return <EquipmentCard item={item} isSelected={context.isSelected(item)} onSelect={() => context.toggle(item)} key={item.key} />;
                })}
            </div>
        );
    });
}

export { App };
