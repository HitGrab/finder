import { FinderRule } from "../types";

/**
 * Strip unwanted properties from an object.
 */
export function only<T = object>(origin: T, keys: (keyof T)[]) {
    return keys.reduce<T>((acc, key) => {
        if (Object.keys(origin as object).includes(String(key)) !== false) {
            acc[key] = origin[key];
        }
        return acc;
    }, {} as T);
}

export function getRuleFromIdentifier<NarrowRule = FinderRule>(identifier: FinderRule | string | undefined, rules: FinderRule[]): NarrowRule | undefined {
    if (identifier === undefined) {
        return undefined;
    }

    if (typeof identifier === "object") {
        const rule = rules?.find(({ id }) => id === identifier.id);
        if (rule === undefined) {
            throw new Error(`Finder could not locate the rule for ${identifier.id}.`);
        }
        return rule as NarrowRule;
    }
    if (typeof identifier === "string") {
        const rule = rules?.find(({ id }) => id === identifier);
        if (rule === undefined) {
            throw new Error(`Finder could not locate the rule for ${identifier}.`);
        }
        return rule as NarrowRule;
    }

    throw new Error("Finder received an invalid rule request format.");
}
