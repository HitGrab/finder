import { FinderProps } from "../types/react-types";
import { FinderContent } from "./finder-content";
import { FinderSearchTermHaystack } from "./finder-search-term-haystack";
declare function Finder<FItem = any, FContext = any>({ items, rules, effects, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialFilters, context, isLoading, disabled, page, numItemsPerPage, requireGroup, ignoreSortByRulesWhileSearchRuleIsActive, onInit, onReady, onFirstUserInteraction, onChange, controllerRef, children, }: FinderProps<FItem, FContext>): import("react/jsx-runtime").JSX.Element;
declare namespace Finder {
    var Content: typeof FinderContent;
    var SearchTermHaystack: typeof FinderSearchTermHaystack;
}
export { Finder };
