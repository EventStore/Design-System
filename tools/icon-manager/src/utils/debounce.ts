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
    let frame: ReturnType<typeof setTimeout> | null = null;

    function Debounce(...args: Parameters<T>) {
        action = () => fn(...args);
        if (frame !== null) return;
        clearTimeout(timeoutId);
        frame = setTimeout(() => {
            frame = null;
            timeoutId = setTimeout(action, ms);
        });
    }

    Debounce.clear = () => {
        clearTimeout(timeoutId);
        frame && clearTimeout(frame);
    };

    Debounce.flush = () => {
        clearTimeout(timeoutId);
        frame && clearTimeout(frame);
        action?.();
    };

    return Debounce;
}
