/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { FinderCore } from "../../core/finder-core";

const FinderContext = createContext<[FinderCore<any>, number | undefined] | null>(null);

export { FinderContext };
