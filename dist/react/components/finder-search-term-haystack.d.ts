import { FinderSearchTermProp } from "../types/react-types";
interface FinderSearchTermHaystackProps {
    children: string;
    Match?: FinderSearchTermProp;
    Miss?: FinderSearchTermProp;
}
declare function FinderSearchTermHaystack({ Match, Miss, children: haystack }: FinderSearchTermHaystackProps): string | import("react/jsx-runtime").JSX.Element;
export { FinderSearchTermHaystack };
