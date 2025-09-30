export class FinderError extends Error {
    constructor(message: string, options?: any) {
        const extendedMessage = `${message} ${JSON.stringify({ ...options })}`;
        super(extendedMessage);
        this.name = "FinderError";
    }
}
