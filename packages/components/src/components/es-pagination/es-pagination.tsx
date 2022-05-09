import { Component, h, Event, Prop, Host, EventEmitter } from '@stencil/core';
import { PageChangeEventType } from './types';

@Component({
    tag: 'es-pagination',
    styleUrl: 'es-pagination.css',
    shadow: true,
})
export class Pagination {
    /**  Number of pages. */
    @Prop() pages: number = 1;
    /**  Current Page. */
    @Prop() current: number = 1;
    /**Hides jump to first, jump to last and page count if number of pages is unknown/infinite. */
    @Prop() finite: boolean = true;
    /** Triggered when a pagination button is clicked*/
    @Event() update!: EventEmitter<PageChangeEventType>;

    render() {
        return (
            <Host>
                {this.finite && (
                    <es-button
                        variant={'minimal'}
                        disabled={this.current === 1}
                        onClick={this.first}
                    >
                        <es-icon
                            icon={'chevron-double'}
                            angle={-90}
                            size={12}
                        />
                    </es-button>
                )}

                <es-button
                    variant={'minimal'}
                    disabled={this.current === 1}
                    onClick={this.previous}
                >
                    <es-icon icon={'chevron'} angle={-90} size={12} />
                </es-button>

                <div>
                    <span>{this.current}</span>
                    {this.finite && <span> / {this.pages}</span>}
                </div>

                <es-button
                    variant={'minimal'}
                    disabled={this.current === this.pages && this.finite}
                    onClick={this.next}
                >
                    <es-icon icon={'chevron'} angle={90} size={12} />
                </es-button>

                {this.finite && (
                    <es-button
                        variant={'minimal'}
                        disabled={this.current === this.pages && this.finite}
                        onClick={this.last}
                    >
                        <es-icon icon={'chevron-double'} angle={90} size={12} />
                    </es-button>
                )}
            </Host>
        );
    }

    private triggerPageChange = (e: PageChangeEventType) => {
        this.update.emit(e);
    };

    private first = () => {
        this.triggerPageChange(PageChangeEventType.First);
    };

    private previous = () => {
        this.triggerPageChange(PageChangeEventType.Previous);
    };

    private next = () => {
        this.triggerPageChange(PageChangeEventType.Next);
    };

    private last = () => {
        this.triggerPageChange(PageChangeEventType.Last);
    };
}
