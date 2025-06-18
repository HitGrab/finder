import { HydratedFilterRule, useFinderContext } from "@hitgrab/finder";
import { Fragment } from "react/jsx-runtime";
import { FinderFilterControl } from "./finder-filter-control";
import { useState } from "react";

export function FilterControls() {
    const finder = useFinderContext();
    const priceRule = finder.filters.rules.find(({ id }) => id === "price_between");
    return (
        <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
            {finder.filters.rules
                .filter((rule) => !rule.hidden)
                .map((rule) => {
                    if (rule.hidden) {
                        return null;
                    }
                    return (
                        <Fragment key={rule.id}>
                            <FinderFilterControl rule={rule} key={rule.id} />
                            <hr style={{ width: "100%" }} />
                        </Fragment>
                    );
                })}
            {priceRule && <PriceFilterControl rule={priceRule} />}
        </div>
    );
}

function PriceFilterControl({ rule }: { rule: HydratedFilterRule }) {
    const finder = useFinderContext();
    const [filterMin, filterMax] = finder.filters.get(rule) ?? [10, 100];
    const [min, setMin] = useState(filterMin);
    const [max, setMax] = useState(filterMax);
    const handleChange = ({ inputMin, inputMax }: { inputMin?: Number; inputMax?: Number }) => {
        let filterMin = inputMin ?? min;
        let filterMax = inputMax ?? max;

        if (inputMin && inputMin > filterMax) {
            filterMax = inputMin;
            setMax(inputMin);
        }
        if (inputMax && inputMax < filterMin) {
            filterMin = inputMax;
            setMin(inputMax);
        }
        finder.filters.set(rule, [filterMin, filterMax]);
    };
    return (
        <>
            Price between:
            <div>
                <input
                    value={min}
                    type="range"
                    min={10}
                    max={100}
                    onChange={(e) => {
                        setMin(Number(e.currentTarget.value));
                        handleChange({ inputMin: Number(e.currentTarget.value) });
                    }}
                />{" "}
                {new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(min)}
            </div>
            <div>
                <input
                    value={100 - max}
                    type="range"
                    min={0}
                    max={90}
                    onChange={(e) => {
                        const adjustedPrice = 100 - Number(e.currentTarget.value);
                        setMax(adjustedPrice);
                        handleChange({ inputMax: adjustedPrice });
                    }}
                    style={{ direction: "rtl" }}
                />
                {new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(max)}
            </div>
        </>
    );
}
