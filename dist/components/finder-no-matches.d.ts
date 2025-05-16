import { ElementType, ReactNode } from "react";
interface FinderEmptyProps {
    children: ElementType | ReactNode;
}
declare function FinderNoMatches({ children: renderProp }: FinderEmptyProps): string | number | bigint | true | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null;
export { FinderNoMatches };
