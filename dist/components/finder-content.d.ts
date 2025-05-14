import { ElementType, ReactNode } from "react";
import { FinderGroupsComponentProps, FinderItemsComponentProps } from "../types";
interface FinderContentProps<FItem = any> {
    children: {
        loading?: ElementType | ReactNode;
        empty?: ElementType | ReactNode;
        items?: ElementType<FinderItemsComponentProps<FItem>>;
        groups?: ElementType<FinderGroupsComponentProps<FItem>>;
    };
}
declare function FinderContent({ children: renderProps }: FinderContentProps): (false | "" | 0 | 0n | import("react/jsx-runtime").JSX.Element | null | undefined)[];
export { FinderContent };
