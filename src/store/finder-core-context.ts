/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';
import { FinderCore } from '../types/types';

const FinderCoreContext = createContext<FinderCore<any, Record<string, any>> | null>(null);

export { FinderCoreContext };
