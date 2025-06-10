import { ElementType, ReactElement } from "react";
import { FinderBaseComponentProps } from "../types/react-types";
interface FinderNoMatchesProps {
    children: ElementType<FinderBaseComponentProps> | ReactElement<FinderBaseComponentProps> | string;
}
declare function FinderNoMatches({ children: renderProp }: FinderNoMatchesProps): string | import("react/jsx-runtime").JSX.Element | null;
export { FinderNoMatches };
