import { ElementType, ReactElement } from "react";
import { FinderBaseComponentProps, FinderGroupsComponentProps, FinderItemsComponentProps } from "../types/react-types";
interface FinderContentProps<FItem = any> {
    children: {
        loading?: ElementType<FinderBaseComponentProps> | ReactElement<FinderBaseComponentProps> | string;
        empty?: ElementType<FinderBaseComponentProps> | ReactElement<FinderBaseComponentProps> | string;
        noMatches?: ElementType<FinderBaseComponentProps> | ReactElement<FinderBaseComponentProps> | string;
        items?: ElementType<FinderItemsComponentProps<FItem>>;
        groups?: ElementType<FinderGroupsComponentProps<FItem>>;
    };
}
declare function FinderContent({ children: renderProps }: FinderContentProps): ("" | import("react/jsx-runtime").JSX.Element | undefined)[];
export { FinderContent };
