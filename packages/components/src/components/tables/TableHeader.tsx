import {
    type EventEmitter,
    type FunctionalComponent,
    h,
    Fragment,
} from '@stencil/core';
import { ICON_NAMESPACE } from '../../icons/namespace';
import type { ColumnGroups, TableCell, TableSort } from './types';
import { variantClasses } from './utils/cellClasses';
import { variantMatches } from './utils/variantMatches';

interface TableHeaderProps {
    headless?: boolean;
    sort?: TableSort;
    sticky?: boolean;
    headerHeight?: number;
    columnGroups: ColumnGroups;
    clickSort: EventEmitter<string>;
}

type CellTuple = [name: string, cell: TableCell<unknown>];

export const TableHeader: FunctionalComponent<TableHeaderProps> = ({
    headless = false,
    sort = [],
    sticky = false,
    columnGroups,
    clickSort,
    headerHeight,
}) => {
    if (headless) return null;

    const [sortKey, order] = sort;
    const grouped = columnGroups.some(([g]) => g != null);

    const renderCellHeader = (
        [name, cell]: CellTuple,
        classes: Record<string, boolean> = {},
        props = {},
    ) => {
        const { title, sortable, variant } = cell;
        if (variantMatches(variant, 'full-width')) return;
        if (sortable) {
            return (
                <c2-button
                    role={'columnheader'}
                    aria-sort={sortKey === name ? order : 'none'}
                    variant={'minimal'}
                    onClick={() => clickSort.emit(name)}
                    class={{ ...classes, ...variantClasses(cell) }}
                    {...props}
                >
                    {title ?? ''}
                    <c2-icon
                        size={20}
                        icon={[
                            ICON_NAMESPACE,
                            sortKey === name ? 'sorted' : 'sort',
                        ]}
                        slot={'after'}
                        angle={order === 'ascending' ? 0 : -180}
                    />
                </c2-button>
            );
        }
        return (
            <div
                role={'columnheader'}
                aria-sort={sortKey === name ? order : 'none'}
                class={{ ...classes, ...variantClasses(cell) }}
                {...props}
            >
                {title ?? ''}
            </div>
        );
    };

    return (
        <>
            <div role={'row'} class={{ sticky }}>
                {columnGroups.map(([group, children]) => {
                    if (!group) {
                        return children.map((cell) => renderCellHeader(cell));
                    }

                    return (
                        <div
                            role={'columnheader'}
                            style={{ gridColumn: `span ${children.length}` }}
                        >
                            {group ?? ''}
                        </div>
                    );
                })}
            </div>
            {grouped && (
                <div role={'row'} class={{ sticky, subheader: true }}>
                    {columnGroups.map(
                        ([group, children], group_index, groups) => {
                            if (!group) {
                                return (
                                    <div
                                        role={'columnheader'}
                                        class={{
                                            group_first: group_index !== 0,
                                            group_last:
                                                group_index !==
                                                groups.length - 1,
                                        }}
                                        style={{
                                            gridColumn: `span ${children.length}`,
                                            top: headerHeight
                                                ? `calc(var(--sticky-top, 0px) + ${headerHeight}px)`
                                                : undefined,
                                        }}
                                    />
                                );
                            }
                            return children.map((cell, cell_index, cells) =>
                                renderCellHeader(
                                    cell,
                                    {
                                        group_first:
                                            group_index !== 0 &&
                                            cell_index === 0,
                                        group_last:
                                            group_index !== groups.length - 1 &&
                                            cell_index === cells.length - 1,
                                    },
                                    {
                                        style: headerHeight
                                            ? {
                                                  top: `calc(var(--sticky-top, 0px) + ${headerHeight}px)`,
                                              }
                                            : undefined,
                                    },
                                ),
                            );
                        },
                    )}
                </div>
            )}
        </>
    );
};
