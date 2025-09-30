import { ERRORS } from "../core-constants";
import { FinderError } from "../errors/finder-error";
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
                return {
                    ...rule,

                    options: typeof rule.options === "function" ? rule.options({ items, context }) : rule.options,

                    // reduce uncertainty
                    multiple: !!rule.multiple,
                    required: !!rule.required,
                    boolean: !!rule.boolean,
                    hidden: !!rule.hidden,

                    // brand it
                    _isHydrated: true,
                };
            }
            return rule;
        });
    }

    getRule(identifier: string | FinderRule) {
        const rule = this.rules.find((rule) => {
            if (typeof identifier === "object") {
                return rule.id === identifier.id;
            }

            return rule.id === identifier;
        });
        if (rule === undefined) {
            throw new FinderError(ERRORS.RULE_NOT_FOUND, identifier);
        }
        return rule;
    }

    getDefinitions() {
        return this.#definitions;
    }

    setRules(definitions: FinderRule<FItem>[]) {
        RuleBook.validateDefinitions(definitions);
        this.#definitions = definitions;
    }

    static validateDefinitions(definitions: FinderRule[]) {
        if (definitions.length === 0) {
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
