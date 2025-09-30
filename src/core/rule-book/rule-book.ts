import { ERRORS } from "../core-constants";
import { FinderError } from "../errors/finder-error";
import { FiltersMixin } from "../filters/filters";
import { FinderRule } from "../types/rule-types";
import { isFilterUnionRule, isGroupByRule, isSearchRule, isSortByRule } from "../utils/rule-utils";

/**
 * Stores rule definitions and hydrated rules
 */
export class RuleBook<FItem, FContext> {
    #definitions;

    rules: FinderRule<FItem>[] = [];

    constructor(definitions: FinderRule<FItem>[], items: FItem[], context: FContext) {
        RuleBook.validateDefinitions(definitions);
        this.#definitions = definitions;
        this.hydrateDefinitions(items, context);
    }

    hydrateDefinitions<FItem, FContext>(items: FItem[], context: FContext) {
        this.rules = this.#definitions.map((rule) => {
            if (isFilterUnionRule(rule)) {
                return FiltersMixin.hydrateRule(rule, items, context);
            }
            return rule;
        });
    }

    getRule<Rule>(identifier: string | FinderRule) {
        return this.rules.find((rule) => {
            if (typeof identifier === "object" && identifier !== null) {
                return rule.id === identifier.id;
            }

            return rule.id === identifier;
        }) as Rule | undefined;
    }

    getDefinitions() {
        return this.#definitions;
    }

    setRules(definitions: FinderRule<FItem>[]) {
        RuleBook.validateDefinitions(definitions);
        this.#definitions = definitions;
    }

    static validateDefinitions(definitions: FinderRule[]) {
        if (!definitions || definitions.length === 0) {
            return false;
        }

        const validators = [isSearchRule, isFilterUnionRule, isSortByRule, isGroupByRule];

        const filterIds = new Set();
        definitions.forEach((rule) => {
            if (rule.id === undefined && !isSearchRule(rule)) {
                throw new FinderError(ERRORS.INVALID_RULE_WITHOUT_ID, rule);
            }

            if (validators.some((validator) => validator(rule)) === false) {
                throw new FinderError(ERRORS.INVALID_RULE_SHAPE, rule);
            }

            if (rule.id) {
                if (filterIds.has(rule.id)) {
                    throw new FinderError(ERRORS.INVALID_RULE_DUPLICATE, rule);
                }
                filterIds.add(rule.id);
            }
        });

        return true;
    }
}
