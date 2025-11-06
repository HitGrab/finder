import { debounce } from "lodash";
import { RuleDefinition } from "./types/rule-types";

function DebounceCallbackRegistry() {
    const registry = new Map<RuleDefinition, ReturnType<typeof debounce>>();

    return (rule: RuleDefinition, callback: () => void) => {
        // if this rule has no delay, immediately trigger the passed callback
        if (rule.debounceMilliseconds === undefined) {
            return callback();
        }

        // add a debounce function to the map
        if (registry.has(rule) === false) {
            registry.set(
                rule,
                debounce((cb: () => void) => cb(), rule.debounceMilliseconds),
            );
        }

        // queue a debounce fn
        return registry.get(rule)?.(callback);
    };
}

export { DebounceCallbackRegistry };
