import { FinderContentRenderProp } from "../types/react-types";
interface FinderLoadingProps {
    children: FinderContentRenderProp;
}
declare function FinderLoading({ children: renderProp }: FinderLoadingProps): Iterable<import("react").ReactNode> | import("react/jsx-runtime").JSX.Element | null;
export { FinderLoading };
