import { FinderRule } from "../../types";
/**
 * Stores rule definitions and hydrated rules
 */
export declare class RuleBook<FItem, FContext> {
    #private;
    rules: FinderRule<FItem>[];
    constructor(definitions: FinderRule<FItem>[], items: FItem[], context: FContext);
    hydrateDefinitions<FItem, FContext>(items: FItem[], context: FContext): void;
    getRule<Rule>(identifier: string | FinderRule): Rule | undefined;
    static validateDefinitions(definitions: FinderRule[]): boolean;
}
