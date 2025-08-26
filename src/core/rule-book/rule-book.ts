import { FinderRule } from "../../types";
import { FiltersMixin } from "../filters/filters";
import { isFilterUnionRule, isGroupByRule, isSearchRule, isSortByRule } from "../utils/rule-utils";

/**
 * Stores rule definitions and hydrated rules
 */
export class RuleBook<FItem, FContext> {
    // static rule definitions
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

    static validateDefinitions(definitions: FinderRule[]) {
        if (!definitions || definitions.length === 0) {
            return false;
        }

        const validators = [isSearchRule, isFilterUnionRule, isSortByRule, isGroupByRule];

        const filterIds: string[] = [];
        definitions.forEach((rule) => {
            if (rule.id === undefined && !isSearchRule(rule)) {
                throw new Error("Finder is missing a unique rule id for rule.");
            }

            if (validators.some((validator) => validator(rule)) === false) {
                throw new Error("Malformed rule definition");
            }

            if (rule.id) {
                if (filterIds.includes(rule.id)) {
                    throw new Error(`Duplicate rule id: ${rule.id}`);
                }
                filterIds.push(rule.id);
            }
        });

        return true;
    }
}
