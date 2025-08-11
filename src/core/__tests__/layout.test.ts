import { FinderCore } from "../finder-core";
import { objectItems } from "./test-constants";
import { LayoutVariant } from "../../types";

describe("Layout", () => {
    test("Accessors and Mutators", () => {
        const galleryMode = { id: "gallery" };
        const tableMode = { id: "table" };
        const layoutVariants: LayoutVariant[] = [galleryMode, tableMode];

        const onChange = vitest.fn();

        const finder = new FinderCore(objectItems, { rules: [], layoutVariants, onChange });
        expect(finder.layout.variants).toStrictEqual([galleryMode, tableMode]);

        // if no initial value is set, the mixin will fallback to the first listed mode
        expect(finder.layout.activeLayout).toBe(galleryMode);

        finder.layout.set("gallery");

        expect(finder.layout.activeLayout).toBe(galleryMode);

        finder.layout.reset();

        expect(onChange).toHaveBeenCalledTimes(2);
    });
});
