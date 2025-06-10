import { ElementType } from "react";
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
declare function FinderContent<FItem = any>({ children: renderProps }: FinderContentProps<FItem>): (import("react/jsx-runtime").JSX.Element | undefined)[];
export { FinderContent };
