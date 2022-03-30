export const isObject = (
    item: unknown,
): item is Record<string | number | symbol, unknown> => {
    return !!item && typeof item === 'object' && !Array.isArray(item);
};

export const fixTagNames = <T>(item: T): T => {
    if (isObject(item)) {
        for (const key in item) {
            if (key === 'tag') {
                (item as any).tagName = item[key];
            } else {
                fixTagNames(item[key]);
            }
        }
    } else if (Array.isArray(item)) {
        for (const child of item) {
            fixTagNames(child);
        }
    }

    return item;
};
