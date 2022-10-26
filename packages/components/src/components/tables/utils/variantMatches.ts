import type { TableCell, TableCellVariant } from '../types';

export const variantMatches = (
    variant: TableCell<unknown>['variant'],
    ...anyof: TableCellVariant[]
) => {
    if (typeof variant === 'string' && anyof.includes(variant)) return true;
    if (Array.isArray(variant) && variant.some((v) => anyof.includes(v))) {
        return true;
    }
    return false;
};
