import { FinderContentRenderProp } from "../types/react-types";
interface FinderContentLoadingProps {
    children: FinderContentRenderProp;
}
declare function FinderContentLoading({ children: Component }: FinderContentLoadingProps): Iterable<import("react").ReactNode> | import("react/jsx-runtime").JSX.Element | null;
export { FinderContentLoading };
