import { Finder, finderRuleset, searchRule } from "@hitgrab/finder";
import "./global.css";
import { useGetListings } from "./hooks/use-get-listings";
import { Listing } from "./types";
import React from "react";

const rules = finderRuleset<Listing>([
    searchRule({
        searchFn: (listing) => {
            // Note that searchFn can either return a single string, or an array of strings.
            if (listing.name) {
                return [
                    listing.address, // 111 Cool St
                    listing.name, // Cool Manor
                ];
            }
            return listing.address;
        },
    }),
]);
function App() {
    const listings = useGetListings();
    console.log(listings);
    return (
        <Finder items={listings} rules={rules}>
            <Finder.Content<Listing>>
                {{
                    items: ({ items }) => (
                        <div className="layout">
                            <div className="map">
                                {items.map((listing) => {
                                    return (
                                        <div
                                            className="listingPixel"
                                            style={{ "--x": listing.position.x, "--y": listing.position.y } as React.CSSProperties}
                                            key={listing.id}
                                        >
                                            <div className="pointer">{listing.address}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ),
                }}
            </Finder.Content>
        </Finder>
    );
}

export { App };
