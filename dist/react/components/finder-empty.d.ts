import { FinderContentRenderProp } from "../types/react-types";
interface FinderEmptyProps {
    children: FinderContentRenderProp;
}
declare function FinderEmpty({ children: renderProp }: FinderEmptyProps): Iterable<import("react").ReactNode> | import("react/jsx-runtime").JSX.Element | null;
export { FinderEmpty };
