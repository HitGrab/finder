import { ERRORS } from "../core-constants";
import { FinderError } from "../finder-error";
import { RuleDefinition } from "../types/rule-types";
import { isFilterRuleDefinition, isGroupByRuleDefinition, isSearchRuleDefinition, isSortByRuleDefinition } from "../utils/rule-utils";

/**
 * Stores rule definitions and hydrated rules class objects
 */
export class RuleBook<FItem, FContext> {
    #definitions;

    rules: RuleDefinition[] = [];

    constructor(definitions: RuleDefinition<FItem>[], items: FItem[], context: FContext) {
        RuleBook.validateDefinitions(definitions);
        this.#definitions = definitions;
        this.hydrateDefinitions(items, context);
    }

    hydrateDefinitions(items: FItem[], context: FContext) {
        this.rules = this.#definitions.map((definition) => {
            if (isFilterRuleDefinition(definition)) {
                const options = typeof definition.options === "function" ? definition.options({ items, context }) : definition.options;
                return {
                    ...definition,
                    boolean: !!definition.boolean,
                    multiple: !!definition.multiple,
                    strictOptions: definition.strictOptions ?? true,
                    options,
                };
            }
            return definition;
        });
    }

    getRule(identifier: string | RuleDefinition) {
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

    setRules(definitions: RuleDefinition<FItem>[]) {
        RuleBook.validateDefinitions(definitions);
        this.#definitions = definitions;
    }

    static validateDefinitions(definitions: RuleDefinition[]) {
        if (definitions.length === 0) {
            return false;
        }

        const validators = [isSearchRuleDefinition, isFilterRuleDefinition, isSortByRuleDefinition, isGroupByRuleDefinition];

        const filterIds = new Set();
        definitions.forEach((rule) => {
            if (rule.id === undefined && !isSearchRuleDefinition(rule)) {
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
