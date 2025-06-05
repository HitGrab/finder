/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { Finder as FinderCore } from "../../core/finder";

const FinderContext = createContext<[FinderCore<any>, number | undefined] | null>(null);

export { FinderContext };
