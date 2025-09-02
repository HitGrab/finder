import { ElementType } from "react";
interface FinderSearchTermProps {
    children: string;
    Component?: ElementType;
    searchTerm?: string;
}
declare function FinderSearchTerm({ Component, searchTerm, children }: FinderSearchTermProps): string | (string | import("react/jsx-runtime").JSX.Element)[];
export { FinderSearchTerm };
