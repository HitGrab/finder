import { use } from 'react';
import { FinderCoreContext } from '../store/finder-core-context';

function useFinder() {
    const value = use(FinderCoreContext);
    if (value === null) {
        throw new Error('useFinder requires a FinderCoreContext.');
    }
    return value;
}

export { useFinder };
