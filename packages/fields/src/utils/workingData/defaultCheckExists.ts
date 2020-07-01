export const defaultCheckExists = (value: any) => {
    return (
        value != null &&
        ((typeof value === 'number' && !Number.isNaN(value)) ||
            (typeof value === 'boolean' && value) ||
            (typeof value === 'string' && !!value.trim().length) ||
            (Array.isArray(value) && !!value.length))
    );
};
