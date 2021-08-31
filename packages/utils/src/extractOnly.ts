/** If the passed array has only one item, it is returned, otherwise it returns null. */
export const extractOnly = <T extends any>(items: T[]): T | null => {
    return items.length === 1 ? items[0] : null;
};
