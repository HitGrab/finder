import { debounce } from "lodash";

type CallbackObject = {
    debounceFn: CallableFunction;
    delay?: number;
};

class DebounceCallbackRegistry {
    #registry: Record<string, CallbackObject> = {};

    register(id: string, delay?: number) {
        this.#registry[id] = {
            debounceFn: delay ? debounce((callback) => callback(), delay) : (callback: CallableFunction) => callback(),
            delay,
        };
    }

    has(id: string) {
        return this.#registry[id] !== undefined;
    }

    call(id: string, callback: CallableFunction) {
        this.#registry[id]?.debounceFn(callback);
    }
}

export { DebounceCallbackRegistry };
