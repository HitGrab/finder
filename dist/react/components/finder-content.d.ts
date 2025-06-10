import { ElementType } from "react";
import { FinderBaseRenderProp, FinderGroupsComponentProps, FinderItemsComponentProps } from "../types/react-types";
interface FinderContentProps<FItem = any> {
    children: {
        loading?: FinderBaseRenderProp;
        empty?: FinderBaseRenderProp;
        noMatches?: FinderBaseRenderProp;
        items?: ElementType<FinderItemsComponentProps<FItem>>;
        groups?: ElementType<FinderGroupsComponentProps<FItem>>;
    };
}
declare function FinderContent({ children: renderProps }: FinderContentProps): (import("react/jsx-runtime").JSX.Element | undefined)[];
export { FinderContent };
