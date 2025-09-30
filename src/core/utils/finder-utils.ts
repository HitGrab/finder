export function clamp(value: number, min: number, max: number) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}

export function simpleUniqBy<T>(data: T[], key: string) {
    const processedKeys: string[] = [];
    return data.reduce<T[]>((acc, row) => {
        const rowKey = row[key as keyof typeof row];
        if (processedKeys.includes(String(rowKey)) === false) {
            acc.push(row);
        }
        return acc;
    }, []);
}

export function range(start: number, end: number) {
    const data: number[] = [];
    for (let i = start; i < end; i++) {
        data.push(i);
    }
    return data;
}
