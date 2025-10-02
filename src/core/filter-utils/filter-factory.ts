import { HydratedFilterRule } from "../types/rule-types";
import { BooleanFilter } from "./boolean-filter";
import { MultipleFilter } from "./multiple-filter";
import { SingleFilter } from "./single-filter";

export function makeFilter(rule: HydratedFilterRule) {
    if (rule.boolean) {
        return BooleanFilter(rule);
    }
    if (rule.multiple) {
        return MultipleFilter(rule);
    }
    return SingleFilter(rule);
}
