import { ElementType } from "react";

import { FinderContentRenderProp, FinderContentItemProps, FinderContentGroupProps } from "../types/react-types";
import { FinderContentLoading } from "./finder-content-loading";
import { FinderContentEmpty } from "./finder-content-empty";
import { FinderContentNoMatches } from "./finder-content-no-matches";
import { FinderContentItems } from "./finder-content-items";
import { FinderContentGroups } from "./finder-content-groups";

interface FinderContentProps<FItem, FContext> {
    children: {
        loading?: FinderContentRenderProp;
        empty?: FinderContentRenderProp;
        noMatches?: FinderContentRenderProp;
        items?: ElementType<FinderContentItemProps<FItem, FContext>>;
        groups?: ElementType<FinderContentGroupProps<FItem, FContext>>;
    };
}
function FinderContent<FItem = any, FContext = any>({ children: renderProps }: FinderContentProps<FItem, FContext>) {
    if (!renderProps || Object.values(renderProps).length === 0) {
        throw new Error("No render props were found.");
    }
    return [
        renderProps.loading && <FinderContentLoading key="loading">{renderProps.loading}</FinderContentLoading>,
        renderProps.empty && <FinderContentEmpty key="empty">{renderProps.empty}</FinderContentEmpty>,
        renderProps.noMatches && <FinderContentNoMatches key="noMatches">{renderProps.noMatches}</FinderContentNoMatches>,
        renderProps.items && <FinderContentItems key="items">{renderProps.items}</FinderContentItems>,
        renderProps.groups && <FinderContentGroups key="groups">{renderProps.groups}</FinderContentGroups>,
    ];
}

FinderContent.Loading = FinderContentLoading;
FinderContent.Empty = FinderContentEmpty;
FinderContent.NoMatches = FinderContentNoMatches;
FinderContent.Items = FinderContentItems;
FinderContent.Groups = FinderContentGroups;

export { FinderContent };
