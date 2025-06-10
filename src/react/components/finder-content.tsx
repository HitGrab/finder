import { ElementType } from "react";
import { FinderEmpty } from "./finder-empty";
import { FinderGroups } from "./finder-groups";
import { FinderItems } from "./finder-items";
import { FinderLoading } from "./finder-loading";
import { FinderNoMatches } from "./finder-no-matches";
import { FinderBaseRenderProp, FinderGroupsComponentProps, FinderItemsComponentProps } from "../types/react-types";

interface FinderContentProps<FItem> {
    children: {
        loading?: FinderBaseRenderProp;
        empty?: FinderBaseRenderProp;
        noMatches?: FinderBaseRenderProp;
        items?: ElementType<FinderItemsComponentProps<FItem>>;
        groups?: ElementType<FinderGroupsComponentProps<FItem>>;
    };
}

function FinderContent<FItem = any>({ children: renderProps }: FinderContentProps<FItem>) {
    if (!renderProps || Object.values(renderProps).length === 0) {
        throw new Error("No render props were found.");
    }

    return [
        renderProps.loading && <FinderLoading key="loading">{renderProps.loading}</FinderLoading>,
        renderProps.items && <FinderItems key="items">{renderProps.items}</FinderItems>,
        renderProps.noMatches && <FinderNoMatches key="noMatches">{renderProps.noMatches}</FinderNoMatches>,
        renderProps.groups && <FinderGroups key="groups">{renderProps.groups}</FinderGroups>,
        renderProps.empty && <FinderEmpty key="empty">{renderProps.empty}</FinderEmpty>,
    ];
}

export { FinderContent };
