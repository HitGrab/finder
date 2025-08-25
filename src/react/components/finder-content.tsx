import { ElementType } from "react";
import { FinderEmpty } from "./finder-empty";
import { FinderGroups } from "./finder-groups";
import { FinderItems } from "./finder-items";
import { FinderLoading } from "./finder-loading";
import { FinderNoMatches } from "./finder-no-matches";
import { FinderContentRenderProp, FinderContentItemProps, FinderContentGroupProps } from "../types/react-types";

interface FinderContentProps<FItem> {
    children: {
        loading?: FinderContentRenderProp;
        empty?: FinderContentRenderProp;
        noMatches?: FinderContentRenderProp;
        items?: ElementType<FinderContentItemProps<FItem>>;
        groups?: ElementType<FinderContentGroupProps<FItem>>;
    };
}

function FinderContent<FItem = any>({ children: renderProps }: FinderContentProps<FItem>) {
    if (!renderProps || Object.values(renderProps).length === 0) {
        throw new Error("No render props were found.");
    }

    return [
        renderProps.loading && <FinderLoading key="loading">{renderProps.loading}</FinderLoading>,
        renderProps.empty && <FinderEmpty key="empty">{renderProps.empty}</FinderEmpty>,
        renderProps.noMatches && <FinderNoMatches key="noMatches">{renderProps.noMatches}</FinderNoMatches>,
        renderProps.items && <FinderItems key="items">{renderProps.items}</FinderItems>,
        renderProps.groups && <FinderGroups key="groups">{renderProps.groups}</FinderGroups>,
    ];
}

FinderContent.Loading = FinderLoading;
FinderContent.Empty = FinderEmpty;
FinderContent.NoMatches = FinderNoMatches;
FinderContent.Items = FinderItems;
FinderContent.Groups = FinderGroups;

export { FinderContent };
