import { InjectedContext } from "../../types";
import { FinderCore } from "../../core/finder-core";
declare function useFinder<FItem = any, FContext extends InjectedContext | undefined = undefined>(): FinderCore<FItem, FContext>;
export { useFinder };
