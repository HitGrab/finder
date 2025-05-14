declare class DebounceCallbackRegistry {
    #private;
    register(id: string, delay?: number): void;
    has(id: string): boolean;
    call(id: string, callback: CallableFunction): void;
}
export { DebounceCallbackRegistry };
