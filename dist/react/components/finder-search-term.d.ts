import { ElementType } from "react";
import { SearchCharacterIndexFn } from "../../core/search/result-segments/result-segment-types";
interface FinderSearchTermProps {
    children: string;
    Component?: ElementType;
    algorithm?: SearchCharacterIndexFn;
}
declare function FinderSearchTerm({ Component, children, algorithm }: FinderSearchTermProps): string | import("react/jsx-runtime").JSX.Element;
export { FinderSearchTerm };
