import { ResultSnapshot, SnapshotOptions } from "../types/core-types";
export declare class Tester<FItem, FContext> {
    snapshot: ResultSnapshot<FItem>;
    isStale: boolean;
    setIsStale(value: boolean): void;
    takeSnapshot({ items, context, mixins }: SnapshotOptions<FItem, FContext>): void;
    static test<FItem, FContext>({ mixins, items, context }: SnapshotOptions<FItem, FContext>): FItem[];
}
