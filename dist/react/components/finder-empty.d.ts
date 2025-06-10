import { ElementType, ReactElement } from "react";
import { FinderBaseComponentProps } from "../types/react-types";
interface FinderEmptyProps {
    children: ElementType<FinderBaseComponentProps> | ReactElement<FinderBaseComponentProps> | string;
}
declare function FinderEmpty({ children: renderProp }: FinderEmptyProps): string | import("react/jsx-runtime").JSX.Element | null;
export { FinderEmpty };
