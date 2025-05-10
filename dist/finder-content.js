import { jsx as _jsx } from "react/jsx-runtime";
import { FinderEmpty } from "./finder-empty";
import { FinderGroups } from "./finder-groups";
import { FinderItems } from "./finder-items";
import { FinderLoading } from "./finder-loading";
function FinderContent({ children: renderProps }) {
    if (!renderProps || Object.values(renderProps).length === 0) {
        throw new Error("No render props were found.");
    }
    return [
        renderProps.loading && _jsx(FinderLoading, { children: renderProps.loading }, "loading"),
        renderProps.items && _jsx(FinderItems, { children: renderProps.items }, "items"),
        renderProps.groups && _jsx(FinderGroups, { children: renderProps.groups }, "groups"),
        renderProps.empty && _jsx(FinderEmpty, { children: renderProps.empty }, "empty"),
    ];
}
export { FinderContent };
