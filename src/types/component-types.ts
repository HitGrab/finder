import { ElementType, ReactNode } from "react";
import { FinderFilterDefinition, FinderPagination, FinderResultGroup } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FinderContentComponentProps<FItem = any> {
    children: {
        loading?: ElementType | ReactNode;
        empty?: ElementType | ReactNode;
        items?: ElementType<FinderItemsComponentProps<FItem>>;
        groups?: ElementType<FinderGroupsComponentProps<FItem>>;
    };
}

export interface FinderItemsComponentProps<FItem> {
    items: FItem[];
    pagination?: FinderPagination;
    meta?: Map<any, any>;
}
export interface FinderGroupsComponentProps<FItem> {
    groups: FinderResultGroup<FItem>[];
    pagination?: FinderPagination;
    meta?: Map<any, any>;
}

export interface FinderFilterComponentProps<FItem, FValue> {
    filter: FinderFilterDefinition<FItem>;
    value: FValue;
    items: FItem[];
    onChange: (value?: FValue) => void;
    meta?: Map<any, any>;
}
