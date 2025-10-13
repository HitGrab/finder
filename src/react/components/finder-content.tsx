import { ElementType } from "react";
import { FinderContentProps } from "../types/react-types";
import { FinderContentLoading } from "./finder-content-loading";
import { FinderContentEmpty } from "./finder-content-empty";
import { FinderContentNoMatches } from "./finder-content-no-matches";
import { FinderContentItems } from "./finder-content-items";
import { FinderContentGroups } from "./finder-content-groups";

interface FinderContentContainerProps<FItem, FContext> {
    children: {
        loading?: ElementType<FinderContentProps<FItem, FContext>["loading"]>;
        empty?: ElementType<FinderContentProps<FItem, FContext>["empty"]>;
        noMatches?: ElementType<FinderContentProps<FItem, FContext>["noMatches"]>;
        items?: ElementType<FinderContentProps<FItem, FContext>["items"]>;
        groups?: ElementType<FinderContentProps<FItem, FContext>["groups"]>;
    };
}
function FinderContent<FItem = any, FContext = any>({ children: renderProps }: FinderContentContainerProps<FItem, FContext>) {
    if (Object.values(renderProps).length === 0) {
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
