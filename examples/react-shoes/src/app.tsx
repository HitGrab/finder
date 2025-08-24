import { Finder, FinderContent } from "@hitgrab/finder";
import "./global.css";
import { range } from "lodash";
import { ShoeCard, ShoeCardSkeleton } from "./components/shoe-card";
import { Accordion } from "./components/accordion";
import { ActiveChips } from "./components/active-chips";
import { BrandFilterControls } from "./components/controls/brand-filter-controls";
import { ColorFilterControls } from "./components/controls/color-filter-controls";
import { PriceFilterControls } from "./components/controls/price-filter-controls";
import { SizeFilterControls } from "./components/controls/size-filter-controls";
import { SortByControls } from "./components/controls/sort-by-controls";
import { NumMatches } from "./components/num-matches";
import { InStockFilterControls } from "./components/controls/in-stock-filter-controls";
import { rules } from "./rules/shoe-rules";
import { useAsyncGetRandomlyGeneratedShoes } from "./hooks/use-random-shoe-generator";
import { NameSearchControl } from "./components/controls/name-search-control";

function App() {
    const { data, isPending } = useAsyncGetRandomlyGeneratedShoes();

    return (
        <Finder items={data} rules={rules} isLoading={isPending}>
            <h1>Kicking Rad Shoe Store</h1>
            <div className="layout">
                <aside>
                    <NameSearchControl />
                    <Accordion>
                        <Accordion.Item label="Brand">
                            <BrandFilterControls />
                        </Accordion.Item>
                        <Accordion.Item label="Price">
                            <PriceFilterControls />
                        </Accordion.Item>
                        <Accordion.Item label="Size">
                            <SizeFilterControls />
                        </Accordion.Item>
                        <Accordion.Item label="Color">
                            <ColorFilterControls />
                        </Accordion.Item>
                        <Accordion.Item label="Sort By">
                            <SortByControls />
                        </Accordion.Item>
                    </Accordion>
                </aside>
                <main>
                    <header>
                        <ActiveChips />
                        <div className="headerControls">
                            <InStockFilterControls />
                            <NumMatches />
                        </div>
                    </header>
                    <section className="shoeList">
                        <FinderContent>
                            {{
                                loading: range(0, 12).map((index) => <ShoeCardSkeleton key={index} />),
                                empty: "No items in list",
                                noMatches: "No matches found.",
                                items: ({ items }) => {
                                    return items.map((item: Shoe) => {
                                        return <ShoeCard item={item} key={item.sku} />;
                                    });
                                },
                            }}
                        </FinderContent>
                    </section>
                    <hr />
                    Assets from https://free-game-assets.itch.io/free-rpg-boot-icons
                </main>
            </div>
        </Finder>
    );
}

export { App };
