import { Finder } from "../finder";
import { objectItems, apple, orange } from "./test-constants";

describe("Selection", () => {
    test("Selects items", () => {
        const finder = new Finder(objectItems, {});

        finder.selectedItems.select(apple);
        expect(finder.selectedItems.items).toStrictEqual([apple]);
    });

    test("Deletes selected item", () => {
        const initialSelectedItems = [apple];

        const finder = new Finder(objectItems, { initialSelectedItems });
        finder.selectedItems.delete(apple);

        expect(finder.selectedItems.items).toStrictEqual([]);
    });

    test("Ignores selection when exceeding limit", () => {
        const initialSelectedItems = [apple];
        const finder = new Finder(objectItems, { initialSelectedItems, maxSelectedItems: 1 });

        finder.selectedItems.select(orange);

        expect(finder.selectedItems.items).toStrictEqual([apple]);
    });
});
