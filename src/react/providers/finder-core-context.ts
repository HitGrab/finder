/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { FinderCore } from "../../core/finder-core";

const FinderCoreContext = createContext<[FinderCore<any, any>, number | undefined] | null>(null);

export { FinderCoreContext };
