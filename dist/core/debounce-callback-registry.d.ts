import { RuleDefinition } from "./types/rule-types";
declare function DebounceCallbackRegistry(): (rule: RuleDefinition, callback: () => void) => any;
export { DebounceCallbackRegistry };
