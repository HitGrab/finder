import { FinderProps } from "../types/react-types";
import { InjectedContext } from "../../types";
declare function Finder<FItem = any, FContext extends InjectedContext | undefined = undefined>({ items, rules, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialFilters, context, isLoading, disabled, page, numItemsPerPage, plugins, requireGroup, onInit, onReady, onFirstUserInteraction, onChange, controllerRef, children, }: FinderProps<FItem, FContext>): import("react/jsx-runtime").JSX.Element;
export { Finder };
