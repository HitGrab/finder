import { ElementType, ReactElement } from "react";
import { FinderBaseComponentProps } from "../types/react-types";
interface FinderLoadingProps {
    children: ElementType<FinderBaseComponentProps> | ReactElement<FinderBaseComponentProps> | string;
}
declare function FinderLoading({ children: renderProp }: FinderLoadingProps): string | import("react/jsx-runtime").JSX.Element | null;
export { FinderLoading };
