/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { FinderInstance } from "../types";

const FinderContext = createContext<[FinderInstance<any>, number | undefined] | null>(null);

export { FinderContext };
