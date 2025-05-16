import { FinderMeta, FinderOption, FinderRule } from "../types";
export declare function getRuleFromIdentifier<NarrowRule = FinderRule>(identifier: FinderRule | string | undefined, rules: FinderRule[]): NarrowRule | undefined;
export declare function getOptionFromIdentifier(optionOrOptionValue: FinderOption | any, options: FinderOption[] | ((meta?: FinderMeta) => FinderOption[]) | undefined, meta?: FinderMeta): any;
export declare function isFinderOption(data: unknown): data is FinderOption;
