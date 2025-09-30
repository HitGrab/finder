import { createContext } from "react";
import { FinderCore } from "../../core/finder-core";

const FinderCoreContext = createContext<[FinderCore, number | undefined] | null>(null);

export { FinderCoreContext };
