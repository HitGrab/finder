import { ElementType, ReactElement, ReactNode } from "react";
import { FinderContentProps } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderContentContainerProps<FItem, FContext> {
    loading?: ElementType<FinderContentProps<FItem, FContext>["loading"]> | ReactElement<FinderContentProps<FItem, FContext>["loading"]> | Iterable<ReactNode>;
    empty?: ElementType<FinderContentProps<FItem, FContext>["empty"]> | ReactElement<FinderContentProps<FItem, FContext>["empty"]> | Iterable<ReactNode>;
    noMatches?:
        | ElementType<FinderContentProps<FItem, FContext>["noMatches"]>
        | ReactElement<FinderContentProps<FItem, FContext>["noMatches"]>
        | Iterable<ReactNode>;
    items?: ElementType<FinderContentProps<FItem, FContext>["items"]> | ReactElement<FinderContentProps<FItem, FContext>["items"]> | Iterable<ReactNode>;
    groups?: ElementType<FinderContentProps<FItem, FContext>["groups"]> | ReactElement<FinderContentProps<FItem, FContext>["groups"]> | Iterable<ReactNode>;
}
function FinderContent<FItem = any, FContext = any>(props: FinderContentContainerProps<FItem, FContext>) {
    const finder = useFinder();
    if (Object.values(props).length === 0) {
        throw new Error("No render props were found.");
    }

    const { loading: LoadingComponent, empty: EmptyComponent, noMatches: NoMatchesComponent, items: ItemsComponent, groups: GroupsComponent } = props;

    if (finder.state === "loading") {
        if (typeof LoadingComponent === "function") {
            return <LoadingComponent pagination={finder.pagination} context={finder.context as FContext} />;
        }

        return LoadingComponent ?? null;
    }

    if (finder.state === "empty") {
        if (typeof EmptyComponent === "function") {
            return <EmptyComponent pagination={finder.pagination} context={finder.context as FContext} />;
        }

        return EmptyComponent ?? null;
    }

    if (finder.state === "noMatches") {
        if (typeof NoMatchesComponent === "function") {
            return <NoMatchesComponent pagination={finder.pagination} context={finder.context as FContext} />;
        }

        return NoMatchesComponent ?? null;
    }

    if (finder.state === "items" && finder.matches.items) {
        if (typeof ItemsComponent === "function") {
            return <ItemsComponent items={finder.matches.items} pagination={finder.pagination} context={finder.context as FContext} />;
        }
        return ItemsComponent ?? null;
    }

    if (finder.state === "groups" && finder.matches.groups) {
        if (typeof GroupsComponent === "function") {
            return <GroupsComponent groups={finder.matches.groups} pagination={finder.pagination} context={finder.context as FContext} />;
        }

        return GroupsComponent ?? null;
    }

    return null;
}

export { FinderContent };
