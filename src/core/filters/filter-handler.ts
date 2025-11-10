import { ERRORS } from "../core-constants";
import { FinderError } from "../finder-error";
import { HydratedFilterRuleDefinition } from "../types/rule-types";
import { isMultipleValueFilterRuleDefinition, isBooleanFilterRuleDefinition, isSingleValueFilterRuleDefinition } from "../utils/rule-utils";
import { BooleanFilterHandler } from "./boolean-filter-handler";
import { MultipleFilterHandler } from "./multiple-filter-handler";
import { SingleFilterHandler } from "./single-filter-handler";

export function makeFilterHandler(definition: HydratedFilterRuleDefinition) {
    if (isMultipleValueFilterRuleDefinition(definition)) {
        return MultipleFilterHandler(definition);
    }
    if (isBooleanFilterRuleDefinition(definition)) {
        return BooleanFilterHandler(definition);
    }
    if (isSingleValueFilterRuleDefinition(definition)) {
        return SingleFilterHandler(definition);
    }
    throw new FinderError(ERRORS.INVALID_RULE_SHAPE, { definition });
}
