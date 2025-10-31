import { createContext } from "react";
import { FinderCoreContextProps } from "../types/react-types";

const FinderCoreContext = createContext<FinderCoreContextProps | null>(null);

export { FinderCoreContext };
