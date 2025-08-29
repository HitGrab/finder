import { FinderProps } from "../types/react-types";
import { FinderContent } from "./finder-content";
import { FinderSearchTerm } from "./finder-search-term";
declare function Finder<FItem = any, FContext = any>({ items, rules, effects, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialFilters, context, isLoading, disabled, page, numItemsPerPage, requireGroup, ignoreSortByRulesWhileSearchRuleIsActive, onInit, onReady, onFirstUserInteraction, onChange, controllerRef, children, }: FinderProps<FItem, FContext>): import("react/jsx-runtime").JSX.Element;
declare namespace Finder {
    var Content: typeof FinderContent;
    var SearchTerm: typeof FinderSearchTerm;
}
export { Finder };
