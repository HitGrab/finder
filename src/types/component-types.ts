import { ElementType, ReactNode } from "react";
import { FinderFilterDefinition, FinderPagination, FinderResultGroup } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FinderContentComponentProps<FItem = any, FMeta = unknown> {
    children: {
        loading?: ElementType | ReactNode;
        empty?: ElementType | ReactNode;
        items?: ElementType<FinderItemsComponentProps<FItem, FMeta>>;
        groups?: ElementType<FinderGroupsComponentProps<FItem, FMeta>>;
    };
}

export interface FinderItemsComponentProps<FItem, FMeta> {
    items: FItem[];
    pagination?: FinderPagination;
    meta?: FMeta;
}
export interface FinderGroupsComponentProps<FItem, FMeta> {
    groups: FinderResultGroup<FItem>[];
    pagination?: FinderPagination;
    meta?: FMeta;
}

export interface FinderFilterComponentProps<FItem, FValue, FMeta> {
    filter: FinderFilterDefinition<FItem>;
    value: FValue;
    items: FItem[];
    onChange: (value?: FValue) => void;
    meta?: FMeta;
}
