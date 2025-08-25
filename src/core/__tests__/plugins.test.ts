// import { FinderCore } from "../finder-core";
// import { finderRuleset, searchRule, filterRule } from "../utils/rule-type-enforcers";
// import { FinderPluginInterface, FinderPluginFn } from "../../types";
// import { objectItems } from "./test-constants";
// import { MockObjectItem } from "./test-types";

// describe("Plugins", () => {
//     test("Sample plugin", () => {
//         const rules = finderRuleset<MockObjectItem>([
//             searchRule({
//                 searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
//             }),
//             filterRule({
//                 id: "price_is_below",
//                 filterFn: (item, value: number) => {
//                     return item.price <= value;
//                 },
//             }),
//             filterRule({
//                 id: "expires_in_five_days",
//                 filterFn: (item) => item.daysUntilExpiryDate === "five",
//                 isBoolean: true,
//             }),
//         ]);

//         const onInit = vitest.fn();
//         const onRegister = vitest.fn();
//         const onChange = vitest.fn();
//         const onInteract = vitest.fn();

//         interface MyPlugin extends FinderPluginInterface {
//             setValue: (value: number) => void;
//             getValue: () => number;
//         }
//         const mockPlugin: FinderPluginFn<MyPlugin> = () => {
//             let value = 5;
//             return {
//                 id: "test",
//                 // Finder has instantiated plugin and injected a reference
//                 register: (finder) => {
//                     onRegister();
//                     finder.events.on("change", () => {
//                         onChange();
//                     });

//                     // First change has been triggered
//                     finder.events.on("firstUserInteraction", () => {
//                         onInteract();
//                     });
//                 },

//                 // Finder has finished initializing
//                 onInit: () => {
//                     onInit();
//                 },

//                 setValue(currentValue: number) {
//                     value = currentValue;
//                 },
//                 getValue: () => value,
//             };
//         };

//         const initializedPlugin = mockPlugin();
//         const finder = new FinderCore(objectItems, { rules, plugins: [initializedPlugin] });
//         expect(onInit).toHaveBeenCalledTimes(1);
//         expect(onRegister).toHaveBeenCalledTimes(1);

//         // onInteract is not triggered until the first state change
//         expect(onInteract).toHaveBeenCalledTimes(0);

//         finder.filters.set("price_is_below", 3);

//         expect(onChange).toHaveBeenCalledTimes(1);

//         // onInteract can only be triggered once
//         finder.filters.set("price_is_below", 1);
//         finder.filters.set("price_is_below", 2);
//         finder.filters.set("price_is_below", 5);
//         expect(onInteract).toHaveBeenCalledTimes(1);

//         finder.plugins.get(initializedPlugin).setValue(10);

//         expect(finder.plugins.get(initializedPlugin).getValue()).toBe(10);
//     });
// });
