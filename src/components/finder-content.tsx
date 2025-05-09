import { FinderContentComponentProps } from "../types/component-types";
import { FinderEmpty } from "./finder-empty";
import { FinderGroups } from "./finder-groups";
import { FinderItems } from "./finder-items";
import { FinderLoading } from "./finder-loading";
import * as React from "react";

function FinderContent({ children: renderProps }: FinderContentComponentProps) {
    if (!renderProps || Object.values(renderProps).length === 0) {
        throw new Error("No render props were found.");
    }

    return [
        renderProps.loading && <FinderLoading key="loading">{renderProps.loading}</FinderLoading>,
        renderProps.items && <FinderItems key="items">{renderProps.items}</FinderItems>,
        renderProps.groups && <FinderGroups key="groups">{renderProps.groups}</FinderGroups>,
        renderProps.empty && <FinderEmpty key="empty">{renderProps.empty}</FinderEmpty>,
    ];
}

export { FinderContent };
