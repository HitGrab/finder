export class FinderError extends Error {
    constructor(message: string, options?: any) {
        let extendedMessage = `${message} ${JSON.stringify({ ...options })}`;
        super(extendedMessage);
        this.name = "FinderError";
    }
}
