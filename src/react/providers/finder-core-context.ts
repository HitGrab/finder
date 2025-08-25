/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { FinderCore } from "../../core/finder-core";
import { InjectedContext } from "../../types";

const FinderCoreContext = createContext<[FinderCore<any, InjectedContext | undefined>, number | undefined] | null>(null);

export { FinderCoreContext };
