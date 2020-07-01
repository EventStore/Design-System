export const extractOnly = <T extends any>(items: T[]): T | null => {
    return items.length === 1 ? items[0] : null;
};
