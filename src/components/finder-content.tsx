import { ElementType, ReactNode } from "react";
import { FinderGroupsComponentProps, FinderItemsComponentProps } from "../types";
import { FinderEmpty } from "./finder-empty";
import { FinderGroups } from "./finder-groups";
import { FinderItems } from "./finder-items";
import { FinderLoading } from "./finder-loading";
import { FinderNoMatches } from "./finder-no-matches";

interface FinderContentProps<FItem = any> {
    children: {
        loading?: ElementType | ReactNode;
        empty?: ElementType | ReactNode;
        noMatches?: ElementType | ReactNode;
        items?: ElementType<FinderItemsComponentProps<FItem>>;
        groups?: ElementType<FinderGroupsComponentProps<FItem>>;
    };
}

function FinderContent({ children: renderProps }: FinderContentProps) {
    if (!renderProps || Object.values(renderProps).length === 0) {
        throw new Error("No render props were found.");
    }

    return [
        // some async data is still being requested
        renderProps.loading && <FinderLoading key="loading">{renderProps.loading}</FinderLoading>,

        // individual item results
        renderProps.items && <FinderItems key="items">{renderProps.items}</FinderItems>,

        // grouped results
        renderProps.groups && <FinderGroups key="groups">{renderProps.groups}</FinderGroups>,

        // this query returned no results.
        renderProps.noMatches && <FinderNoMatches key="noMatches">{renderProps.noMatches}</FinderNoMatches>,

        // this instance has no items to sort through.
        renderProps.empty && <FinderEmpty key="empty">{renderProps.empty}</FinderEmpty>,
    ];
}

export { FinderContent };
