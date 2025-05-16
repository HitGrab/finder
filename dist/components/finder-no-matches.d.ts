import { ElementType, ReactNode } from "react";
interface FinderNoMatchesProps<FItem> {
    children: ElementType | ReactNode;
}
declare function FinderNoMatches<FItem>({ children: renderProp }: FinderNoMatchesProps<FItem>): string | number | bigint | true | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null;
export { FinderNoMatches };
