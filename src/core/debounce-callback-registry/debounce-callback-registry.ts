import { debounce } from "lodash";

interface CallbackObject {
    debounceFn: CallableFunction;
    delay?: number;
}

class DebounceCallbackRegistry {
    #registry: Record<string, CallbackObject> = {};

    register(id: string, delay?: number) {
        this.#registry[id] = {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            debounceFn: delay ? debounce((callback: CallableFunction) => callback(), delay) : (callback: CallableFunction) => callback(),
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
