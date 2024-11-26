import {
    Component,
    h,
    Prop,
    Host,
    Event,
    type EventEmitter,
    Element,
    State,
    Method,
    Watch,
} from '@stencil/core';
import { Link, router } from '@eventstore-ui/router';
import { theme } from '@kurrent-ui/theme';
import { debounce, rateLimit } from '@kurrent-ui/utils';

import type {
    ClickRow,
    ColumnGroups,
    JumpOptions,
    LoadWindow,
    SortOrder,
    TableCell,
    TableCells,
    TableSort,
} from '../types';
import { TableHeader } from '../TableHeader';
import { cellClasses } from '../utils/cellClasses';
import { autoExtract } from '../utils/autoExtract';
import type { RenderFunction } from '../../../types';

const MAX_TABLE_HEIGHT = 15_000_000;

/** Create a virtualized table from data. */
@Component({
    tag: 'es-table-virtualized',
    styleUrl: 'es-table-virtualized.css',
    shadow: false,
})
export class Table {
    @Element() host!: HTMLEsTableVirtualizedElement;

    /** Passed to cell renderer as `parent`. */
    @Prop() identifier: string = 'table-virtualized';
    /** Do not render header. */
    @Prop() headless: boolean = false;
    /** Header sticks to scroll parent. */
    @Prop() stickyHeader: boolean = true;
    /** Sync function for extracting the data from the row. By default, it assumes you passed an array of data as your columns. */
    @Prop() getCellData!: (key: string, index: number) => any;
    /** Sync function for converting an index into a key */
    @Prop() getKeyFromIndex: (index: number) => string = (i) => `${i}`;
    /** A record of table cell definitions. */
    @Prop() cells!: TableCells<any, any>;
    /** The order and keys of the cells to be rendered. If omitted, all cells will be rendered. */
    @Prop() columns?: string[];
    /** The total number of rows */
    @Prop() rowCount!: number;
    /** Display in a row before the first row */
    @Prop() renderBefore?: RenderFunction;
    /** Display in a row after the last row */
    @Prop() renderAfter?: RenderFunction;
    /** The size of the window to render */
    @Prop() windowSize: number = 100;
    /** Groups rows into blocks */
    @Prop() blockSize: number = 10;
    /** The size of the grid rows before starting a reflow */
    @Prop() reflowSize: number = 1000;
    /** A function to calculate a href from the cell data. */
    @Prop() linkRowTo?: (row: any) => string;
    /** The height (in pixels) of the row */
    @Prop() rowHeight: number = 50;
    /** The height (in pixels) of the header */
    @Prop() headerHeight: number = 52;
    /** The height (in pixels) of the before */
    @Prop() beforeHeight: number = 0;
    /** The height (in pixels) of the after */
    @Prop() afterHeight: number = 0;
    /** If rows should be allowed to take focus */
    @Prop() rowTakesFocus?: boolean;
    /** A function to calculate the class or classes of the row from the cellData. */
    @Prop() rowClass: (
        row: any,
        key: string,
        index: number,
    ) => Record<string, boolean> | string | undefined = () => undefined;
    /** How the table is sorted */
    @Prop() sort?: TableSort;
    /** If the table should lock scroll on appending events */
    @Prop() scrollLock?: boolean;
    /** Pass extra props to cells */
    @Prop() extraCellProps?: (key: string, data: any) => Record<string, any>;

    /** Triggered whenever a row is clicked. The `detail` is the item in the row array. */
    @Event() clickRow!: EventEmitter<ClickRow>;
    /** Triggered whenever a sortable header is clicked */
    @Event() clickSort!: EventEmitter<string>;
    /** Triggered when a block is rendered */
    @Event() loadBlock!: EventEmitter<LoadWindow>;
    /** Triggered when the last block is rendered */
    @Event() lastBlock!: EventEmitter<void>;
    /** Triggered when the first block is rendered */
    @Event() firstBlock!: EventEmitter<void>;

    /** The first row being rendered */
    @State() trailingEdge: number = 0;
    /** Which row to start the reflow from */
    @State() reflowRow: number = 0;
    /** The distance (in pixels) "warp" the scrollbar */
    @State() warp: number = 0;
    /** Which row to hightlight on jump */
    @State() jumpHighlight: string | null = null;
    /** Invert row banding, to prevent flashing */
    @State() invertBanding: boolean = false;

    private initial!: string;
    private headerRows!: number;
    private resizeObserver = new ResizeObserver(() => this.handleResize());
    private scrollParent!: Element;
    private jumpHighlightTimeout!: ReturnType<typeof setTimeout>;
    private lastRenderRowCount?: number;

    componentWillLoad() {
        this.scrollParent = this.getScrollParent();
        window.addEventListener('scroll', this.handleScroll, {
            passive: true,
        });
        this.resizeObserver.observe(this.host);
        this.headerRows = this.calcHeaderRows();
        this.initial = this.getKeyFromIndex(0);
        this.trailingEdgeChange(this.trailingEdge);
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.handleScroll);
        this.resizeObserver.disconnect();
        this.handleScroll.clear();
        this.applyWarp.clear();
        clearTimeout(this.jumpHighlightTimeout);
    }

    @Watch('jumpHighlight')
    jumpHighlightChange(key: string) {
        clearTimeout(this.jumpHighlightTimeout);
        this.jumpHighlightTimeout = setTimeout(() => {
            if (this.jumpHighlight === key) {
                this.jumpHighlight = null;
            }
        }, 2000);
    }

    @Watch('sort')
    sortChange(from: SortOrder, to: SortOrder) {
        if (from?.[0] === to?.[0] && from?.[1] === to?.[1]) return;
        this.trailingEdgeChange(this.trailingEdge);
    }

    private prependCount?: number;

    @Watch('rowCount')
    async rowCountChange(next: number, previous: number) {
        const initial = this.getKeyFromIndex(0);

        if (initial !== this.initial) {
            this.initial = initial;
            const difference = next - previous;

            if (difference % 2 !== 0) {
                this.invertBanding = !this.invertBanding;
            }

            if (this.scrollLock) {
                this.prependCount = difference;

                if (
                    this.scrollParent.scrollHeight >
                    this.scrollParent.clientHeight +
                        this.scrollParent.scrollTop +
                        this.prependCount * this.rowHeight
                ) {
                    this.applyScrollLock();
                }
            }
        }

        await this.hasRenderedWithCurrentRowCount();
        const trailingEdge = this.trailingEdge;
        this.calculateWindowing();
        if (trailingEdge === this.trailingEdge) {
            this.trailingEdgeChange(this.trailingEdge);
        }
    }

    @Watch('trailingEdge')
    trailingEdgeChange(trailingEdge: number) {
        const to = Math.min(
            trailingEdge + (this.windowSize - 1),
            this.rowCount - 1,
        );

        this.loadBlock.emit({
            from: trailingEdge,
            to,
            count: to - trailingEdge + 1,
        });

        if (trailingEdge <= 0) {
            this.firstBlock.emit();
        }

        if (to >= this.rowCount - 1) {
            this.lastBlock.emit();
        }
    }

    /** Jump to the passed row, with smooth scroll and highlight, if specified. */
    @Method()
    async jumpToRow(
        index: number,
        { highlight = true, smooth = 'auto' }: Partial<JumpOptions> = {},
    ) {
        if (index < 0 || index > this.rowCount) {
            throw new Error(`Index is out of bounds: ${index}`);
        }

        await this.hasRenderedWithCurrentRowCount();

        this.internalJumpToRow(index, { highlight, smooth });
    }

    private renderRowGroup = (key: string, index: number) => (
        <div
            role={'rowgroup'}
            key={key}
            class={{
                odd: this.invertBanding ? index % 2 !== 0 : index % 2 === 0,
                highlight: this.jumpHighlight === key,
            }}
        >
            {this.renderRow(key, index)}
        </div>
    );

    private renderRow = (key: string, index: number) => {
        const data = this.getCellData(key, index);

        if (this.linkRowTo) {
            return (
                <Link
                    url={this.linkRowTo(data)}
                    role={'row'}
                    key={key}
                    aria-rowindex={index}
                    class={this.rowClass(data, key, index)}
                    onClick={this.emitRowClick({ data, row: key, key, index })}
                    tabindex={'-1'}
                >
                    {this.renderCells(data, key, index)}
                </Link>
            );
        }

        return (
            <div
                role={'row'}
                aria-rowindex={index}
                key={key}
                class={this.rowClass(data, key, index)}
                onClick={this.emitRowClick({ data, row: key, key, index })}
                tabindex={'-1'}
            >
                {this.renderCells(data, key, index)}
            </div>
        );
    };

    private renderCells = (data: any, key: string, index: number) =>
        this.getColumnGroups().map(([_, cells], groupIndex, groups) =>
            cells.map(([name, cell], cellIndex, cells) => {
                const focusCell =
                    groupIndex === 0 &&
                    cellIndex === 0 &&
                    (!!this.rowTakesFocus || !!this.linkRowTo);

                return (
                    <div
                        role={'cell'}
                        tabindex={focusCell ? '0' : undefined}
                        onKeyDown={
                            focusCell
                                ? this.focusCellKeyPress({
                                      index,
                                      key,
                                      row: key,
                                      data,
                                  })
                                : undefined
                        }
                        style={{
                            gridRowStart: `${this.calculateGridRow(index)}`,
                        }}
                        class={cellClasses(cell, data, focusCell, {
                            groupIndex,
                            groupCount: groups.length,
                            cellIndex,
                            cellCount: cells.length,
                        })}
                    >
                        {cell.cell
                            ? cell.cell(h, {
                                  ...(this.extraCellProps?.(key, data) ?? {}),
                                  key,
                                  data,
                                  parent: this.identifier,
                              })
                            : autoExtract(data, name)}
                    </div>
                );
            }),
        );

    render() {
        const fullHeight = this.fullHeight();
        const clippedHeight = Math.min(MAX_TABLE_HEIGHT, fullHeight);
        this.lastRenderRowCount = this.rowCount;

        return (
            <Host
                high-contrast={theme.isHighContrast()}
                dark={theme.isDark()}
                style={{
                    height: `${clippedHeight}px`,
                    minHeight: `${clippedHeight}px`,
                }}
            >
                <div
                    role={'table'}
                    style={{
                        gridTemplateColumns: this.gridTemplateColumns(),
                        gridTemplateRows: this.gridTemplateRows(),
                        top: `${this.reflowRow * this.rowHeight - this.warp}px`,
                    }}
                >
                    <TableHeader
                        columnGroups={this.getColumnGroups()}
                        clickSort={this.clickSort}
                        headless={this.headless}
                        sort={this.sort}
                        sticky={this.stickyHeader}
                        headerHeight={this.headerHeight}
                    />
                    <div
                        class={'before'}
                        style={{ height: `${this.beforeHeight}px` }}
                    >
                        {this.renderBefore?.(h)}
                    </div>
                    {Array.from(
                        {
                            length: Math.min(this.windowSize, this.rowCount),
                        },
                        (_, i) => {
                            const index = i + this.trailingEdge;
                            if (index > this.rowCount - 1) return;
                            return this.renderRowGroup(
                                this.getKeyFromIndex(index),
                                index,
                            );
                        },
                    )}
                    <div
                        class={'after'}
                        style={{ height: `${this.afterHeight}px` }}
                    >
                        {this.renderAfter?.(h)}
                    </div>
                </div>
            </Host>
        );
    }

    private focusCellKeyPress = (data: ClickRow) => (e: KeyboardEvent) => {
        if (e.code !== 'Space' && e.code !== 'Enter') return;

        this.clickRow.emit(data);
        if (this.linkRowTo) {
            const link = this.linkRowTo(data);
            router.history?.push(link);
        }
    };

    private emitRowClick = (data: ClickRow) => () => {
        this.clickRow.emit(data);
    };

    private getCell = (col: string): TableCell<unknown> => {
        return this.cells[col] ?? { title: '' };
    };

    private getColumns = (): string[] => {
        if (this.columns) return this.columns;
        return Object.keys(this.cells);
    };

    private getColumnGroups = (): ColumnGroups => {
        return this.getColumns().reduce<ColumnGroups>((acc, col) => {
            const cell = this.getCell(col);
            if (cell.variant === 'exclude') return acc;
            if (acc.at(-1) != null && acc.at(-1)![0] === cell.group) {
                acc.at(-1)![1].push([col, cell]);
            } else {
                acc.push([cell.group, [[col, cell]]]);
            }
            return acc;
        }, []);
    };

    private gridTemplateColumns = () =>
        this.getColumns().reduce((acc, col) => {
            const cell = this.getCell(col);
            if (cell.variant === 'exclude') return acc;
            return `${acc} ${cell.width ?? 'auto'}`;
        }, '');

    private gridTemplateRows = () => {
        return `repeat(${this.headerRows}, ${this.headerHeight}px) [before] ${
            this.beforeHeight
        }px repeat(${this.rowCount - this.reflowRow}, ${
            this.rowHeight
        }px) [after] ${this.afterHeight}px `;
    };

    private calcHeaderRows = () => {
        if (this.headless) return 0;
        if (this.getColumnGroups().some(([g]) => g != null)) return 2;
        return 1;
    };

    private getScrollParent = () => {
        const canScroll = (node: Element) => {
            const style = getComputedStyle(node, null);
            return (
                style.getPropertyValue('overflow') === 'scroll' ||
                style.getPropertyValue('overflow') === 'auto' ||
                style.getPropertyValue('overflow-y') === 'scroll' ||
                style.getPropertyValue('overflow-y') === 'auto' ||
                style.getPropertyValue('overflow-x') === 'scroll' ||
                style.getPropertyValue('overflow-x') === 'auto'
            );
        };

        const scrollParent = (node: Element): Element => {
            const parent = node.parentElement ?? node.parentNode?.parentElement;

            if (!parent) {
                return document.scrollingElement || document.documentElement;
            }

            if (canScroll(parent)) return parent;

            return scrollParent(parent);
        };

        return scrollParent(this.host);
    };

    private rowPosition = (row: number) => row * this.rowHeight;
    private fullHeight = () =>
        this.headerHeight +
        this.beforeHeight +
        this.rowPosition(this.rowCount) +
        this.afterHeight;

    private applyScrollLock = () => {
        if (!this.prependCount) return;
        this.scrollParent.scrollTop += this.prependCount * this.rowHeight;
        delete this.prependCount;
        this.calculateWarp();
        this.calculateWindowing();
    };

    private handleResize = () => {
        this.applyScrollLock();
    };

    private previousScrollTop = 0;
    private handleScroll = rateLimit(() => {
        this.calculateWarp();
        this.calculateWindowing();
    }, 10);

    private internalScrollTop = 0;
    private warpedScrollTop = 0;
    private justWarped = false;

    private calculateWarp = () => {
        const scrollTop = this.scrollParent.scrollTop;
        const distance = scrollTop - this.previousScrollTop;
        const warpFactor = this.warpFactor(this.internalScrollTop + distance);
        this.previousScrollTop = scrollTop;

        if (this.justWarped) {
            this.justWarped = false;
        } else if (warpFactor === 1) {
            this.internalScrollTop += distance;
            this.warpedScrollTop = this.internalScrollTop;
        } else if (Math.abs(distance) > 10_000) {
            const jumpWarp = this.warpFactor(scrollTop);
            this.internalScrollTop = Math.round(scrollTop / jumpWarp);
            this.warpedScrollTop = scrollTop;
            this.warp = this.internalScrollTop - this.warpedScrollTop;
        } else {
            this.internalScrollTop += distance;
            this.warpedScrollTop = Math.round(
                this.internalScrollTop * warpFactor,
            );
            this.applyWarp();
        }
    };

    private warpFactor = (scrollTop: number) => {
        const expectedTableHeight = this.fullHeight();
        if (expectedTableHeight <= MAX_TABLE_HEIGHT) return 1;

        const actualHeight =
            this.scrollParent.scrollHeight - this.scrollParent.clientHeight;
        const expectedHeight =
            expectedTableHeight + (actualHeight - MAX_TABLE_HEIGHT);

        const distanceToEdge = Math.min(scrollTop, expectedHeight - scrollTop);

        // We don't want to warp at the edges
        if (distanceToEdge < actualHeight / 8) {
            return 1;
        }

        return actualHeight / expectedHeight;
    };

    private applyWarp = debounce(() => {
        this.justWarped = true;

        if (this.scrollParent.scrollTop === this.warpedScrollTop) {
            return;
        }

        this.scrollParent.scrollTop = this.warpedScrollTop;
        this.warp = this.internalScrollTop - this.warpedScrollTop;
    }, 1000);

    private calculateWindowing = () => {
        if (this.rowCount <= this.windowSize) {
            this.trailingEdge = 0;
            this.reflowRow = 0;
            return;
        }

        const top = Math.floor(this.internalScrollTop / this.rowHeight);
        const offsetTop = Math.max(0, top - this.windowSize / 4);
        const blockTop = offsetTop - (offsetTop % this.blockSize);
        const lastRow = this.rowCount;
        const lastBlock = lastRow - (lastRow % this.blockSize);
        const trailingEdge = Math.min(blockTop, lastBlock);

        this.trailingEdge = trailingEdge;
        this.reflowRow = trailingEdge - (trailingEdge % this.reflowSize);
    };

    private calculateGridRow = (index: number) => {
        return index + 2 + this.headerRows - this.reflowRow;
    };

    private hasRenderedWithCurrentRowCount = () => {
        const matches = (r: () => void) => {
            requestAnimationFrame(() => {
                if (this.rowCount === this.lastRenderRowCount) {
                    return r();
                }
                return matches(r);
            });
        };
        return new Promise<void>(matches);
    };

    private internalJumpToRow = (
        index: number,
        { smooth, highlight }: JumpOptions,
    ) => {
        const fullHeight = this.fullHeight();
        const trueHeight = this.host.offsetHeight;
        const scrollHeight = this.scrollParent.scrollHeight;
        const expectedTop = this.rowPosition(index);

        const realTop = (() => {
            // no warp needed
            if (fullHeight === trueHeight) {
                return expectedTop;
            }

            // at top edge, no warp
            const topEdge = Math.floor(MAX_TABLE_HEIGHT / 8 / this.rowHeight);

            if (index <= topEdge) {
                return Math.max(0, expectedTop);
            }

            // at bottom edge, no warp from bottom
            const bottomEdge = this.rowCount - topEdge;
            if (index >= bottomEdge) {
                return (
                    scrollHeight -
                    (this.scrollParent.clientHeight - this.host.offsetTop) -
                    Math.max(0, fullHeight - expectedTop)
                );
            }

            // somewhere in the middle, standard warp
            return (
                expectedTop *
                ((scrollHeight - this.scrollParent.clientHeight) / fullHeight)
            );
        })();

        const distance = Math.abs(this.scrollParent.scrollTop - realTop);

        if (
            fullHeight === trueHeight &&
            smooth === 'auto' &&
            distance < this.windowSize * this.rowHeight
        ) {
            this.scrollParent.scrollTo({
                top: realTop,
                behavior: 'smooth',
            });
        } else {
            this.scrollParent.scrollTop = realTop;
            this.internalScrollTop = expectedTop;
            this.warpedScrollTop = realTop;
            this.warp = this.internalScrollTop - this.warpedScrollTop;
            this.justWarped = true;
        }

        this.calculateWindowing();

        if (highlight) {
            this.jumpHighlight = this.getKeyFromIndex(index);
        }
    };
}
