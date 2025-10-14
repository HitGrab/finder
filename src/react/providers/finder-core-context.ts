import { createContext } from "react";
import { FinderCoreContextProps } from "../types/react-types";

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const FinderCoreContext = createContext<FinderCoreContextProps | null>(null);

export { FinderCoreContext };
