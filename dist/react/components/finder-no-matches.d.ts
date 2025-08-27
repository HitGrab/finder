import { FinderContentRenderProp } from "../types/react-types";
interface FinderNoMatchesProps {
    children: FinderContentRenderProp;
}
declare function FinderNoMatches({ children: Component }: FinderNoMatchesProps): Iterable<import("react").ReactNode> | import("react/jsx-runtime").JSX.Element | null;
export { FinderNoMatches };
