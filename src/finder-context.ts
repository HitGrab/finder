/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { FinderCore } from "./types";

const FinderContext = createContext<FinderCore<any> | null>(null);

export { FinderContext };
