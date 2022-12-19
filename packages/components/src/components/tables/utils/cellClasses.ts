import type { TableCell } from '../types';

interface CellPosition {
    groupIndex: number;
    cellIndex: number;
    groupCount: number;
    cellCount: number;
}

export const cellClasses = (
    cell: TableCell<unknown>,
    data: unknown,
    focusCell: boolean,
    { groupIndex, cellIndex, groupCount, cellCount }: CellPosition,
) => {
    const classes =
        typeof cell.class === 'function' ? cell.class(data) : cell.class;
    const extraClasses = !classes
        ? {}
        : typeof classes === 'string'
        ? { [classes]: true }
        : classes;

    return {
        focusCell,
        group_first: groupIndex !== 0 && cellIndex === 0,
        group_last:
            groupIndex !== groupCount - 1 && cellIndex === cellCount - 1,
        ...variantClasses(cell),
        ...extraClasses,
    };
};

export const variantClasses = ({
    variant,
    align = 'start',
}: TableCell<unknown>) => {
    const variants = typeof variant === 'string' ? [variant] : variant ?? [];
    return {
        no_pad: variants.includes('no-pad'),
        borderless: variants.includes('borderless'),
        full_width: variants.includes('full-width'),
        [align]: align !== 'start',
    };
};
