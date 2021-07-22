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
    let frame: ReturnType<typeof requestAnimationFrame> = -1;

    function Debounce(...args: Parameters<T>) {
        action = () => fn(...args);
        if (frame !== -1) return;
        clearTimeout(timeoutId);
        frame = requestAnimationFrame(() => {
            frame = -1;
            timeoutId = setTimeout(action, ms);
        });
    }

    Debounce.clear = () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(frame);
    };

    Debounce.flush = () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(frame);
        action?.();
    };

    return Debounce;
}
