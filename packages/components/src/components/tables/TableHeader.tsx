import { EventEmitter, FunctionalComponent, h, Fragment } from '@stencil/core';
import { ICON_NAMESPACE } from '../../icons/namespace';
import type { ColumnGroups, TableCell, TableSort } from './types';

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
        [name, { title, sortable }]: CellTuple,
        props = {},
    ) => {
        if (sortable) {
            return (
                <es-button
                    role={'columnheader'}
                    aria-sort={sortKey === name ? order : 'none'}
                    variant={'minimal'}
                    onClick={() => clickSort.emit(name)}
                    {...props}
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
                                renderCellHeader(cell, {
                                    class: {
                                        group_first:
                                            group_index !== 0 &&
                                            cell_index === 0,
                                        group_last:
                                            group_index !== groups.length - 1 &&
                                            cell_index === cells.length - 1,
                                    },
                                    style: headerHeight
                                        ? {
                                              top: `calc(var(--sticky-top, 0px) + ${headerHeight}px)`,
                                          }
                                        : undefined,
                                }),
                            );
                        },
                    )}
                </div>
            )}
        </>
    );
};
