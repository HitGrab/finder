import { FinderMeta, FinderOption, FinderRule } from "../types";
/**
 * Strip unwanted properties from an object.
 */
export declare function only<T = object>(origin: T, keys: (keyof T)[]): T;
export declare function getRuleFromIdentifier<NarrowRule = FinderRule>(identifier: FinderRule | string | undefined, rules: FinderRule[]): NarrowRule | undefined;
export declare function getOptionFromIdentifier(optionOrOptionValue: FinderOption | any, options: FinderOption[] | ((meta?: FinderMeta) => FinderOption[]) | undefined, meta?: FinderMeta): any;
