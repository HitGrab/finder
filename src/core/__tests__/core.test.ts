import { objectItems } from "./test-constants";
import { FinderCore } from "../finder-core";

describe("Core", () => {
    test("Catches duplicate id", () => {
        const rules = [
            {
                id: "duplicate",
                filterFn: () => true,
            },
            {
                id: "duplicate",
                filterFn: () => true,
            },
        ];
        expect(() => {
            new FinderCore(objectItems, { rules });
        }).toThrowError();
    });

    test("Catches malformed rules", () => {
        const rules = [
            {
                id: "invalid",
                mysteryFn: () => true,
            },
        ];
        expect(() => {
            // @ts-expect-error
            const finder = new FinderCore(objectItems, { rules });
        }).toThrowError();
    });

    test("Catches missing ids", () => {
        const rules = [
            {
                filterFn: () => true,
            },
        ];
        expect(() => {
            // @ts-expect-error
            const finder = new FinderCore(objectItems, { rules });
        }).toThrowError();
    });
});
