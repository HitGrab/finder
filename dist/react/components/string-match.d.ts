import { FinderSearchTermProp } from "../types/react-types";
interface StringMatchProps {
    needle: string;
    haystack: string;
    Match?: FinderSearchTermProp;
    Miss?: FinderSearchTermProp;
}
/**
 * Split a string into result segment components .
 */
declare function StringMatch({ needle, haystack, Match, Miss }: StringMatchProps): string | (string | import("react/jsx-runtime").JSX.Element)[];
export { StringMatch };
