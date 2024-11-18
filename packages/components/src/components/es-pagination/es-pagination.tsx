import {
    Component,
    h,
    Event,
    Prop,
    Host,
    type EventEmitter,
} from '@stencil/core';
import type { PageChangeEventType } from './types';
import { ICON_NAMESPACE } from '../../icons/namespace';

/**
 * Page navigation with ability to jump to first and last pages with `pageCount` is provided.
 */

@Component({
    tag: 'es-pagination',
    styleUrl: 'es-pagination.css',
    shadow: true,
})
export class Pagination {
    /**  Number of pages. */
    @Prop() pageCount?: number;
    /**  Current Page. */
    @Prop() current!: number;
    /** Triggered when a pagination button is clicked*/
    @Event() update!: EventEmitter<PageChangeEventType>;

    render() {
        const finite: boolean = this.pageCount != null;

        return (
            <Host role={'navigation'} aria-label={'pagination'}>
                {finite && (
                    <es-button
                        role={'button'}
                        aria-label={'First page'}
                        variant={'minimal'}
                        disabled={this.current === 1}
                        onClick={this.first}
                    >
                        <es-icon
                            icon={[ICON_NAMESPACE, 'chevron-double']}
                            angle={90}
                            size={20}
                        />
                    </es-button>
                )}

                <es-button
                    role={'button'}
                    aria-label={'Previous page'}
                    variant={'minimal'}
                    disabled={this.current === 1}
                    onClick={this.previous}
                >
                    <es-icon
                        icon={[ICON_NAMESPACE, 'chevron']}
                        angle={90}
                        size={20}
                    />
                </es-button>

                <div>
                    <span>{this.current}</span>
                    {finite && (
                        <span class={'page-count'}> / {this.pageCount}</span>
                    )}
                </div>

                <es-button
                    role={'button'}
                    aria-label={'Next page'}
                    variant={'minimal'}
                    disabled={this.current === this.pageCount && finite}
                    onClick={this.next}
                >
                    <es-icon
                        icon={[ICON_NAMESPACE, 'chevron']}
                        angle={-90}
                        size={20}
                    />
                </es-button>

                {finite && (
                    <es-button
                        role={'button'}
                        aria-label={'Last page'}
                        variant={'minimal'}
                        disabled={this.current === this.pageCount && finite}
                        onClick={this.last}
                    >
                        <es-icon
                            icon={[ICON_NAMESPACE, 'chevron-double']}
                            angle={-90}
                            size={20}
                        />
                    </es-button>
                )}
            </Host>
        );
    }

    private pageChangeEmitter = (type: PageChangeEventType) => () => {
        this.update.emit(type);
    };

    private first = this.pageChangeEmitter('first');
    private previous = this.pageChangeEmitter('previous');
    private next = this.pageChangeEmitter('next');
    private last = this.pageChangeEmitter('last');
}
