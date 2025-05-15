import { FinderMeta, FinderOption, FinderRule } from "../types";
export declare function getRuleFromIdentifier<NarrowRule = FinderRule>(identifier: FinderRule | string | undefined, rules: FinderRule[]): NarrowRule | undefined;
export declare function getOptionFromIdentifier<FItem>(optionOrOptionValue: FinderOption | any, options: FinderOption[] | ((items: FItem[], meta?: FinderMeta) => FinderOption[]) | undefined, items: FItem[], meta?: FinderMeta): any;
export declare function isFinderOption(data: unknown): data is FinderOption;
