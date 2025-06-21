import { brands } from "@/hooks/shoe-constants";
import { finderRuleset, filterRule, sortByRule } from "@hitgrab/finder";
import { intersection, sortBy, capitalize } from "lodash";

/**
 * An array of static rules that can be activated by Finder.
 */
export const rules = finderRuleset<Shoe>([
    filterRule({
        id: "brand",
        label: "Brand",
        multiple: true,
        filterFn: (item, value) => value.includes(item.brand),
        options: () => brands.map((brand) => ({ label: brand, value: brand })),
    }),
    filterRule({
        id: "price_between",
        label: "Price",
        multiple: true,
        filterFn: (item, value) => {
            const allValues = value.reduce<number[]>((acc, [min, max]) => {
                acc.push(min);
                acc.push(max);
                return acc;
            }, []);
            return item.price >= Math.min(...allValues) && item.price <= Math.max(...allValues);
        },
        options: [
            {
                label: "$50-99",
                value: [50, 99],
            },
            {
                label: "$100-149",
                value: [100, 149],
            },
            {
                label: "$150-249",
                value: [150, 249],
            },
            {
                label: "$250+",
                value: [250, Infinity],
            },
        ],
    }),
    filterRule({
        id: "size",
        label: "Size",
        multiple: true,
        filterFn: (item, value) => intersection(item.sizes, value).length > 0,
        options: (items) => {
            const sizeSet = new Set<number>();
            items.forEach((item) => {
                item.sizes.forEach((size) => {
                    sizeSet.add(size);
                });
            });
            const sizeArray = Array.from(sizeSet);
            const sortedArray = sortBy(sizeArray);
            return sortedArray.map((size) => {
                return {
                    label: String(size),
                    value: size,
                };
            });
        },
    }),
    filterRule({
        id: "in_stock",
        label: "In Stock",
        filterFn: (item) => item.in_stock,
        isBoolean: true,
    }),
    filterRule({
        id: "color",
        label: "Color",
        filterFn: (item, value) => item.colors.includes(value),
        options: (items) => {
            const uniqueColors = items
                .reduce((acc, item) => {
                    item.colors.forEach((color) => {
                        acc.add(color);
                    });
                    return acc;
                }, new Set<string>())
                .values();

            return Array.from(uniqueColors)
                .sort()
                .map((color) => {
                    return {
                        label: capitalize(color),
                        value: color,
                    };
                });
        },
    }),

    sortByRule({
        id: "name",
        label: "Name",
        sortFn: (item) => item.name,
    }),
    sortByRule({
        id: "rating",
        label: "Rating",
        sortFn: (item) => item.rating,
        defaultSortDirection: "desc",
    }),
    sortByRule({
        id: "price_low",
        label: "Price ( low to high )",
        sortFn: (item) => item.price,
    }),
    sortByRule({
        id: "price_high",
        label: "Price ( high to low )",
        sortFn: (item) => item.price,
        defaultSortDirection: "desc",
    }),
]);
