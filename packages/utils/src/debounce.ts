interface Debounce<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): void;
    clear(): void;
    flush(): void;
}

export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    ms: number,
): Debounce<T> {
    let timeoutId: ReturnType<typeof setTimeout>;
    let action: () => void;

    function Debounce(...args: Parameters<T>) {
        clearTimeout(timeoutId);
        action = () => fn(...args);
        timeoutId = setTimeout(action, ms);
    }

    Debounce.clear = () => {
        clearTimeout(timeoutId);
    };

    Debounce.flush = () => {
        action?.();
        clearTimeout(timeoutId);
    };

    return Debounce;
}
