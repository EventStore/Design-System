import { EventEmitter, FunctionalComponent, h } from '@stencil/core';
import { ICON_NAMESPACE } from '../../icons/namespace';
import type { TableCell, TableSort } from './types';

interface TableHeaderProps {
    headless?: boolean;
    sort?: TableSort;
    sticky?: boolean;
    columns: string[];
    getCell: (col: string) => TableCell<unknown>;
    clickSort: EventEmitter<string>;
}

export const TableHeader: FunctionalComponent<TableHeaderProps> = ({
    headless = false,
    sort = [],
    sticky = false,
    columns,
    getCell,
    clickSort,
}) => {
    if (headless) return null;
    const [sortKey, order] = sort;
    return (
        <div role={'row'} class={{ sticky }}>
            {columns.map((name) => {
                const { variant, title, sortable } = getCell(name);
                if (variant === 'exclude') return;
                if (sortable) {
                    return (
                        <es-button
                            role={'columnheader'}
                            aria-sort={sortKey === name ? order : 'none'}
                            variant={'minimal'}
                            onClick={() => clickSort.emit(name)}
                        >
                            {title ?? ''}
                            <es-icon
                                size={20}
                                icon={[
                                    ICON_NAMESPACE,
                                    sortKey === name ? 'sorted' : 'sort',
                                ]}
                                slot={'after'}
                                angle={order === 'ascending' ? 0 : -180}
                            />
                        </es-button>
                    );
                }

                return (
                    <div
                        role={'columnheader'}
                        aria-sort={sortKey === name ? order : 'none'}
                    >
                        {title ?? ''}
                    </div>
                );
            })}
        </div>
    );
};
