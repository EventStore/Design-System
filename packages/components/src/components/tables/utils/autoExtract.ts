export const autoExtract = (data: any, name: string) => {
    const value = data?.[name];
    return typeof value === 'string' ||
        typeof value === 'bigint' ||
        typeof value === 'number'
        ? value
        : null;
};
